import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type IPopupTitleColor = 'info' | 'warning' | 'danger' | 'success';
export type IPopupDecorator = 'warning' | 'recording' | '';

@Component({
  selector: 'app-generic-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss'],
})
export class GenericPopupComponent {
  @Input() title: string = 'PLACEHOLDER TITLE';
  @Input() subtitle: string = '';
  @Input() decorator: IPopupDecorator = '';
  @Input() titleColor: IPopupTitleColor = 'info';
}
