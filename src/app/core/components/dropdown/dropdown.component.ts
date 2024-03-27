import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { OverlayComponent } from '@core/components/overlay';
import { EOverlayPosition, TDropdownItem } from '@core/models/client';

const imports = [CdkOverlayOrigin, NgFor, OverlayComponent];
@Component({
  imports,
  selector: 'app-dropdown',
  standalone: true,
  styleUrl: './dropdown.component.scss',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() position: EOverlayPosition = EOverlayPosition.bottomEnd;
  @Input() dropdownItems: Array<TDropdownItem> = [];
}
