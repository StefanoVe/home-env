import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  GenericPopupComponent,
  IPopupDecorator,
  IPopupTitleColor,
} from 'src/app/shared/generic-popup/generic-popup.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    GenericPopupComponent,
    LoadingComponent,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  public popupConfig: {
    title: string;
    decorator: IPopupDecorator;
    titleColor: IPopupTitleColor;
    subtitle: string;
  } = this._authService.authKey
    ? {
        title: 'update config',
        decorator: '',
        titleColor: 'info',
        subtitle: '',
      }
    : {
        title: 'no initial config found',
        decorator: 'warning',
        titleColor: 'warning',
        subtitle: 'enter your api key',
      };

  public configForm = new FormGroup({
    authKey: new FormControl(this._authService.authKey, [Validators.required]),
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  public submitConfig(): void {
    if (!this.configForm.value.authKey) {
      return;
    }

    this._authService.setAuth(this.configForm.value.authKey);
    location.reload();
  }
}
