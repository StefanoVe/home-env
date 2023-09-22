import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IToastColors } from 'src/app/interfaces/interface.toast';

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
  @Input() messageColor: IToastColors = 'info';
}
