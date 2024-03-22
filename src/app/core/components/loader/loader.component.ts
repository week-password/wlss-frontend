import { Component, Input } from '@angular/core';

import { EBaseColor } from '@core/models/client';

@Component({
  selector: 'app-loader',
  standalone: true,
  styleUrl: 'loader.component.scss',
  templateUrl: 'loader.component.html',
})
export class LoaderComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() scale = 1;
}
