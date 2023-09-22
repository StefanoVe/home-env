import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { interval, map, startWith, switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GenericPopupComponent } from 'src/app/shared/generic-popup/generic-popup.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule, GenericPopupComponent, ToastComponent],
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  @ViewChild('LogsContainer') private logsContainer:
    | ElementRef<HTMLDivElement>
    | undefined;

  public pollingRate = 500;
  private _firstLoad = true;

  public loading = false;
  public logs$ = interval(this.pollingRate).pipe(
    startWith(0),
    switchMap(() => this._api.logs()),
    tap(() => {
      this.loading = false;
      this.scrollToBottom();
    })
  );

  public env$ = this._api.env().pipe(
    map((res) => {
      return Object.entries(res).map(([key, value]) => {
        return { key, value };
      });
    })
  );

  constructor(private _api: ApiService) {}

  scrollToBottom(): void {
    if (!this.logsContainer) {
      return;
    }

    const _e = this.logsContainer.nativeElement;

    if (
      _e.scrollTop + 50 < _e.scrollHeight - _e.offsetHeight &&
      !this._firstLoad
    ) {
      return;
    }

    this._firstLoad = false;
    _e.scrollTop = _e.scrollHeight;
  }
}
