import { Injectable } from '@angular/core';

const DEFAULT_TARGET_ADDRESS = 'http://localhost:1234';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _lsAuthName = 'poi.auth';
  private _lsTargetAddress = 'poi.targetAddress';

  constructor() {}

  public get authKey() {
    return localStorage.getItem(this._lsAuthName) as string;
  }

  public setAuth(auth: string) {
    localStorage.setItem(this._lsAuthName, auth);

    return auth;
  }

  public get targetAddress() {
    return (
      localStorage.getItem(this._lsTargetAddress) || DEFAULT_TARGET_ADDRESS
    );
  }

  public setTargetAddress(targetAddress: string) {
    localStorage.setItem(this._lsTargetAddress, targetAddress);

    return targetAddress;
  }
}
