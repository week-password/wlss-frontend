import { NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { LoaderComponent } from '@core/components/loader';
import { EBaseColor } from '@core/models/client';

const imports = [LoaderComponent, MatButtonModule, NgIf];
@Component({
  imports,
  selector: 'app-button',
  standalone: true,
  styleUrl: 'button.component.scss',
  templateUrl: 'button.component.html',
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
