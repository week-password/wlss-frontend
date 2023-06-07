import { Component, Input } from '@angular/core';
import { EBaseColor } from 'src/app/core/models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() message: string;
}
