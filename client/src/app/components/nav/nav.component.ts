import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public authKey = this._authService.authKey;
  public status = this._api.serverStatus$;
  constructor(private _authService: AuthService, private _api: ApiService) {}
}
