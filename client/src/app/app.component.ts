import { Component } from '@angular/core';

export const clientVersion = '1.0.3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public toggleDone = false;
}
