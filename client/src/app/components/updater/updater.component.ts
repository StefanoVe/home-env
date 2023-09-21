import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, tap } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-updater',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.scss'],
})
export class UpdaterComponent {
  public updateAvailable$ = new BehaviorSubject<boolean>(false);
  public showContent$ = this.updateAvailable$.pipe(
    tap((result) => {
      if (!result) {
        return;
      }
      setTimeout(() => {
        location.reload();
      }, 1500);
    })
  );

  constructor(private _sw: SwUpdate) {
    this._checkForUpdate();
  }

  private _checkForUpdate(): void {
    this._sw.checkForUpdate().then((r) => {
      this.updateAvailable$.next(r);
    });
  }
}
