import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map } from 'rxjs';
import { ClientInformationComponent } from 'src/app/components/client-information/client-information.component';
import { ServerInformationComponent } from 'src/app/components/server-information/server-information.component';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    GenericPopupComponent,
    LoadingComponent,
    ClientInformationComponent,
    ServerInformationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public displayContent$ = interval(1000).pipe(map((value) => true));
}
