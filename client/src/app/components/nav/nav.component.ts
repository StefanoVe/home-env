import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  public status$ = this._api.serverStatus$;

  public navItems$ = new BehaviorSubject<
    { name: string; path: string; disabled: boolean }[]
  >([
    { name: 'Home', path: '/home', disabled: false },
    {
      name: 'configuration',
      path: '/config',
      disabled: false,
    },
    {
      name: 'camera',
      path: '/camera',
      disabled: false,
    },
  ]);

  constructor(private _authService: AuthService, private _api: ApiService) {
    this.status$.subscribe((status) => {
      this.navItems$.next(this.getNavItems(!!status));
    });
  }

  public getNavItems(status: boolean) {
    return [
      { name: 'Home', path: '/home', disabled: false },
      {
        name: 'configuration',
        path: '/config',
        disabled: false,
      },
      {
        name: 'camera',
        path: '/camera',
        disabled: !status,
      },
    ];
  }
}
