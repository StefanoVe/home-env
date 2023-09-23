import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  IPopupDecorator,
  IPopupTitleColor,
} from 'src/app/interfaces/interface.popup';
import { WarningDecoratorComponent } from '../warning-decorator/warning-decorator.component';

@Component({
  selector: 'app-generic-popup',
  standalone: true,
  imports: [CommonModule, WarningDecoratorComponent],
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss'],
})
export class GenericPopupComponent {
  @Input() title: string = 'PLACEHOLDER TITLE';
  @Input() subtitle: string = '';
  @Input() decorator: IPopupDecorator = '';
  @Input() titleColor: IPopupTitleColor = 'info';
}
