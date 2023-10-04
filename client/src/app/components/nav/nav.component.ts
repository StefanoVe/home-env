import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';

interface NavItem {
  name: string;
  path: string;
  disabled: boolean;
}

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

  private _separator: NavItem = {
    name: '‎',
    path: '/separator-item',
    disabled: true,
  };

  private _staticNavItems: NavItem[] = [
    { name: 'status', path: '/home', disabled: false },
    {
      name: 'printer',
      path: '/printer',
      disabled: false,
    },
    {
      name: 'homebridge',
      path: '/homebridge',
      disabled: false,
    },
    {
      name: "router",
      path: '/router',
      disabled: false
    },
    this._separator,
    {
      name: 'configuration',
      path: '/config',
      disabled: false,
    },
    {
      name: 'debug server',
      path: '/debug',
      disabled: false,
    },
  ];

  public navItems$ = new BehaviorSubject<NavItem[]>(this._staticNavItems);

  constructor(private _authService: AuthService, private _api: ApiService) {
    this.status$.subscribe((status) => {
      this.navItems$.next(this.getNavItems(!!status));
    });
  }

  public getNavItems(status: boolean) {
    return this._staticNavItems.map((i) => {

        const dynamicRoutes = ['/printer', '/debug', '/homebridge', '/router']

      if (dynamicRoutes.includes(i.path)) {
        return {
          ...i,
          disabled: !status,
        };
      }

      return i;
    });
  }
}
