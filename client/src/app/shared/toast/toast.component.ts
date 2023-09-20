import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IPopupTitleColor } from '../generic-popup/generic-popup.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() message = 'NO MESSAGE';
  @Input() showWarning = false;
  @Input() messageColor: IPopupTitleColor = 'info';
}
