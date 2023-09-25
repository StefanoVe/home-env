import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReplaySubject,
  catchError,
  interval,
  map,
  startWith,
  switchMap,
  tap,
  timeout
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
  public pollingRate = 5000;
  public serverStatus$ = new ReplaySubject<ServerStatus | null>(1);

  private _headers = {
    headers: new HttpHeaders({
      'x-api-key': this._authService.authKey,
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.init();
  }

  public init() {
    this._ping()
      .pipe(
        timeout(10000),
        switchMap(() =>
          interval(this.pollingRate).pipe(
            startWith(0),
            switchMap(() => this._ping())
          )
        ),
        catchError(async (err) => {
          console.error(err);
          this._router.navigate(['/']);
          this.serverStatus$.next(null);
        })
      )
      .subscribe();
  }

  private _ping() {
    return this.httpClient
      .get<ServerStatus>(this._url('ping'), this._headers)
      .pipe(
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

  public logs() {
    return this.httpClient.get<string[]>(this._url('debug/logs'), {
      ...this._headers,
    });
  }

  public env() {
    return this.httpClient.get<string[]>(this._url('debug/env'), {
      ...this._headers,
    });
  }

  private _url(path: string) {
    return `${this._authService.targetAddress}/api/${path}`;
  }
}
