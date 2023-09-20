import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Subject,
  catchError,
  interval,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from './auth.service';

export interface CameraInfo {
  name: string;
  location: string;
  resolution: string;
  fps: number;
  ip: string;
}

interface ServerStatus {
  motd: string;
  success: boolean;
  uptime: number;
  version: string;
  ip: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public serverStatus$ = new Subject<ServerStatus | null>();

  constructor(
    private httpClient: HttpClient,
    private _authService: AuthService
  ) {
    interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.ping())
      )
      .subscribe();
  }

  private _headers = {
    headers: new HttpHeaders({
      'x-api-key': this._authService.authKey,
    }),
  };

  public ping() {
    return this.httpClient
      .get<ServerStatus>(this._url('ping'), this._headers)
      .pipe(
        catchError(async (err) => {
          this.serverStatus$.next(null);
        }),
        tap((data) => {
          this.serverStatus$.next(data || null);
        })
      );
  }

  public cameraInfo() {
    return this.httpClient.get<CameraInfo>(
      this._url('camera/info'),
      this._headers
    );
  }

  public cameraFeed() {
    return this.httpClient
      .get(this._url('camera/feed'), {
        responseType: 'arraybuffer',
        ...this._headers,
      })
      .pipe(
        map((data) => {
          const TYPED_ARRAY = new Uint8Array(data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          const base64String = btoa(STRING_CHAR);
          return `data:image/jpeg;base64,${base64String}`;
        })
      );
  }

  private _url(path: string) {
    return `${this._authService.targetAddress}/api/${path}`;
  }
}
