import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';

@Component({
  selector: 'app-home-router',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent],
  templateUrl: './home-router.component.html',
  styleUrls: ['./home-router.component.scss'],
})
export class HomeRouterComponent {
  status$ = this._api.serverStatus$.pipe(
    map((status) => ({
      ...status,
      baseIp: `https://${status?.baseIp}`,
    }))
  );

  constructor(private _api: ApiService) {}
}
