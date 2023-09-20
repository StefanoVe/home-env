import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class NetworkService {
  constructor(private _http: HttpClient) {}

  public getClientIP() {
    return this._http
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .pipe(map((response) => response.ip));
  }
}
