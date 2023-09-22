import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  IPopupDecorator,
  IPopupTitleColor,
} from 'src/app/interfaces/interface.popup';

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
