import { BehaviorSubject, interval } from 'rxjs';

export class UptimeTracker {
  private _uptime$ = new BehaviorSubject<number>(0);

  constructor(debug = false) {
    interval(1000).subscribe(() => {
      this._uptime$.next(this._uptime$.value + 1);

      if (!debug) {
        return;
      }

      console.log(`Uptime: ${this._uptime$.value}`);
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
