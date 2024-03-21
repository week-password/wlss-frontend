import { Component, Input } from '@angular/core';

import { EBaseColor } from '@core/models/client';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() scale = 1;
}
