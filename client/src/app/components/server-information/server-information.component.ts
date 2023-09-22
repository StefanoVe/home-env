import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IToastColors } from 'src/app/interfaces/interface.toast';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-server-information',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent, ToastComponent],
  templateUrl: './server-information.component.html',
  styleUrls: ['./server-information.component.scss'],
})
export class ServerInformationComponent {
  public loading = true;
  public pollingRate = this._api.pollingRate;
  public serverStatus$ = this._api.serverStatus$.pipe(
    map((status) => {
      this.loading = false;
      if (!status) {
        return {
          success: false,
          uptime: 0,
          version: '0.0.0',
          ip: '0.0.0.0',
          motd: 'Server is unavailable.',
        };
      }

      return status;
    })
  );
  public toastConfig$ = new BehaviorSubject<{
    message: string;
    color: IToastColors;
  }>({
    message: 'Obtaining system data ...',
    color: 'info',
  });

  constructor(private _api: ApiService) {}

  public uptimeFormatter(uptime: number): string {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
    const seconds = Math.floor(((uptime % 86400) % 3600) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  public retryConnection() {
    this.loading = true;
    this.toastConfig$.next({
      message: 'retrying connection ...',
      color: 'warning',
    });
    setTimeout(() => {
      this._api.init();
    }, 500);
  }
}
