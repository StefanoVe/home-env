import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _lsAuthName = 'poi.auth';

  constructor() {}

  public get authKey() {
    return localStorage.getItem(this._lsAuthName) as string;
  }

  public setAuth(auth: string) {
    localStorage.setItem(this._lsAuthName, auth);

    return auth;
  }
}
