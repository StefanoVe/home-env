import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Subject,
  catchError,
  concatMap,
  interval,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timeout,
} from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { WarningDecoratorComponent } from 'src/app/shared/warning-decorator/warning-decorator.component';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [
    CommonModule,
    GenericPopupComponent,
    LoadingComponent,
    ToastComponent,
    WarningDecoratorComponent,
  ],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  public loading = true;
  private _requestWaitTime = 1000;
  public fps = 1000 / this._requestWaitTime;
  public cameraInfo$ = this._api.cameraInfo().pipe(
    catchError(async (err) => {
      return { fps: 0, resolution: '0x0', ip: '', location: '', name: '' };
    })
  );

  public destroyLoading$ = new Subject();
  public hasError$ = new Subject();

  public camera$ = this._api.cameraFeed().pipe(
    timeout(4000),
    takeUntil(this.hasError$),
    switchMap(() =>
      interval(this._requestWaitTime).pipe(
        startWith(0),
        concatMap(() => this._api.cameraFeed()),
        tap(() => {
          this.loading = false;
          this.destroyLoading$.next(true);
        })
      )
    ),
    catchError(async (err) => {
      console.error('something went wrong with the camera', err);
      this.hasError$.next(true);
      return '';
    })
  );

  constructor(private _api: ApiService) {}
}
