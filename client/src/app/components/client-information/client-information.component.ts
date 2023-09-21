import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { format } from 'date-fns';
import { interval, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkService } from 'src/app/services/network.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-client-information',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent, ToastComponent],
  providers: [NetworkService],
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.scss'],
})
export class ClientInformationComponent {
  public clientIP$ = this._networkService.getClientIP();
  public currentDate$ = interval(1000).pipe(
    startWith(0),
    map(() => format(new Date(), 'dd/MM/yyyy'))
  );
  public currentTime$ = interval(1000).pipe(
    startWith(0),
    map(() => format(new Date(), 'HH:mm:ss'))
  );

  public get authKey() {
    return this._authService.authKey;
  }

  public get targetAddress() {
    return this._authService.targetAddress;
  }

  constructor(
    private _networkService: NetworkService,
    private _authService: AuthService
  ) {}
}
