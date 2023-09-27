import axios from 'axios';
import { interval, startWith, tap } from 'rxjs';
import { declareEnvs } from './service.envs';
import { wLog } from './service.logs';

const { PROXY_URL, ENV, PORT, PROXY_AUTH } = declareEnvs(['PROXY_URL', 'ENV', 'PORT','PROXY_AUTH']);
export class NetworkClass {
  private _pollingRate = 7200000; //2 ore
  private _currentIP: string | null = null;
  private _latestIP: string | null = null;

  private _refreshIP$ = interval(this._pollingRate).pipe(
    startWith(0),
    tap(async () => {
      await this._setCurrentIP();

      if (ENV !== 'production') {
        return;
      }

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
      .get<{ ip: string }>(
        `https://api.ipify.org?format=json&random=${Math.random() * 1000}}`
      )
      .catch((err) => {
        wLog(`[!] Failed to get current IP: ${err.message}`, 'error');
        return {
          data: {
            ip: null,
          },
        };
      });

    //assegno il nuovo IP a _currenIP
    this._currentIP = `${data.ip}:${PORT}`;
    wLog('IP refreshed!, current ip is ' + this._currentIP, 'success');
  }

  private async _setProxyTarget() {
    if (!this._currentIP) {
      //se l'ip è null esco
      return;
    }

    if (this._currentIP === this._latestIP) {
      //se l'ip è uguale a quello precedente esco
      wLog('no need to update proxy target', 'info');
      return;
    }

    wLog(`Pointing proxy to ${this._currentIP}`, 'info');

    //chiamo il proxy per aggiornare il target passando l'auth key
    const result = await axios
      .post(`${PROXY_URL}/target?AUTH=${PROXY_AUTH}`, {
        ip: this._currentIP,
      })
      .catch((e) => {
        wLog(`[!] Failed to update proxy target: ${e.message}`, 'error');
        return { data: { status: 'error' } };
      });

    if (result.data.status !== 'success') {
      return;
    }

    wLog('Proxy target updated!', 'warning');
  }
}
