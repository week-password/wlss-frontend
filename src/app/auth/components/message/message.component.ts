import { Component, Input } from '@angular/core';

import { EBaseColor } from '@core/models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
})
export class MessageComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
}
