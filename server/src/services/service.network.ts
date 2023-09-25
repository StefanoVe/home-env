import axios from 'axios';
import { interval, startWith, tap } from 'rxjs';
import { genericErrorHandler } from './errors';
import { wLog } from './service.logs';

export class NetworkClass {
  private _pollingRate = 7200000; //2 ore
  private _currentIP: string = '';
  private _latestIP = '';
  private _refreshIP$ = interval(this._pollingRate).pipe(
    startWith(0),
    tap(async () => {
      await this._setCurrentIP();
      await this._setProxyTarget();
    })
  );

  public get ip() {
    return this._currentIP;
  }

  constructor() {
    this._refreshIP$.subscribe();
  }

  private async _setCurrentIP() {
    //aggiorno il valore di latestIP con l'ip corrente per tenerlo in cache in caso cambi
    this._latestIP = this._currentIP;

    //ottengo il nuovo IP
    const { data } = await axios
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .catch((err) => {
        wLog(`[!] Failed to get current IP: ${err.message}`, 'error');
        return {
          data: {
            ip: null,
          },
        };
      });

    if (!data.ip) {
      return;
    }

    //assegno il nuovo IP a _currenIP
    this._currentIP = data.ip;
    wLog('IP refreshed!', 'success');
  }

  private async _setProxyTarget() {
    if (this._currentIP === this._latestIP) {
      wLog('no need to update proxy target', 'info');
      return;
    }

    wLog(`Pointing proxy to ${this._currentIP}`, 'info');

    const result = await axios
      .post(`${Bun.env.PROXY_URL}/target?AUTH=${Bun.env.PROXY_AUTH}`, {
        ip: this._currentIP,
      })
      .catch(genericErrorHandler);

    wLog('Proxy target updated!', 'success');
  }
}
