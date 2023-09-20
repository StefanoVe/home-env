import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, interval, startWith, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';

@Component({
  selector: 'app-server-information',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent],
  templateUrl: './server-information.component.html',
  styleUrls: ['./server-information.component.scss'],
})
export class ServerInformationComponent {
  public serverStatus$ = interval(1999).pipe(
    startWith(0),
    switchMap(() =>
      this._api.ping().pipe(
        catchError(async (err) => {
          console.error(err);
          return {
            success: false,
            uptime: 0,
            version: '0.0.0',
            ip: '0.0.0.0',
            motd: 'Server is unavailable.',
          };
        })
      )
    )
  );

  constructor(private _api: ApiService) {}

  public uptimeFormatter(uptime: number): string {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
    const seconds = Math.floor(((uptime % 86400) % 3600) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
