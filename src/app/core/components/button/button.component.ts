import { NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { LoaderComponent } from '@core/components/loader';
import { EBaseColor } from '@core/models/client';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [LoaderComponent, MatButtonModule, NgIf],
})
export class ButtonComponent {
  @Input() color: EBaseColor = EBaseColor.primary;
  @Input() disabled = false;
  @Input() height: number;
  @Input() label: string;
  @Input() loading = false;

  @HostBinding('class')
  get disablePointerEventsClass(): string {
    return this.disabled || this.loading ? 'disable-pointer-events' : '';
  }
}
