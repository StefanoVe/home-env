import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const clientVersion = '1.0.5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public toggleDone = false;

  constructor(
    private _currentRouter: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._applyConfig();
  }

  private _applyConfig(): void {
    const apiKey = this._currentRouter.snapshot.queryParamMap.get('apiKey');
    const targetAddress =
      this._currentRouter.snapshot.queryParams['targetAddress'];

    console.log(this._currentRouter.snapshot.queryParams);

    if (apiKey) {
      console.log('appling api key', apiKey);
      this._authService.setAuth(apiKey);
    }

    if (targetAddress) {
      console.log('appling target address', targetAddress);
      this._authService.setTargetAddress(targetAddress);
    }

    if (apiKey || targetAddress) {
      this._router.navigate(['/']);
      location.reload();
    }
  }
}
