import { BehaviorSubject, interval } from 'rxjs';
import { wLog } from './service.logs';

export class UptimeTracker {
  private _uptime$ = new BehaviorSubject<number>(0);

  constructor(debug = false) {
    interval(1000).subscribe(() => {
      this._uptime$.next(this._uptime$.value + 1);

      if (!debug) {
        return;
      }

      wLog(`Uptime: ${this._uptime$.value}`, 'info');
    });
  }

  public static init(debug = false) {
    return new UptimeTracker(debug);
  }

  public get stream$() {
    return this._uptime$;
  }

  public get get() {
    return this._uptime$.value;
  }
}
