import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';

@Component({
  selector: 'app-homebridge',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent],
  templateUrl: './homebridge.component.html',
  styleUrls: ['./homebridge.component.scss'],
})
export class HomebridgeComponent {
  public data$ = this._api.homebridgeData();

  constructor(private _api: ApiService, private _sanitizer: DomSanitizer) {}
}
