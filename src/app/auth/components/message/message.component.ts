import { Component, Input } from '@angular/core';

import { EBaseColor } from '@core/models/client';

@Component({
  selector: 'app-message',
  standalone: true,
  styleUrl: 'message.component.scss',
  templateUrl: 'message.component.html',
})
export class MessageComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
}
