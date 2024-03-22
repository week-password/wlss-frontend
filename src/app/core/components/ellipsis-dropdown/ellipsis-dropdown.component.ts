import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgFor } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { IconComponent } from '@core/components/icon';
import { OverlayComponent } from '@core/components/overlay';
import { EOverlayPosition, TDropdownItem } from '@core/models/client';

const imports = [CdkOverlayOrigin, IconComponent, NgFor, OverlayComponent];
@Component({
  imports,
  selector: 'app-ellipsis-dropdown',
  standalone: true,
  styleUrl: 'ellipsis-dropdown.component.scss',
  templateUrl: 'ellipsis-dropdown.component.html',
})
export class EllipsisDropdownComponent {
  @Input() position: EOverlayPosition;
  @Input() dropdownItems: Array<TDropdownItem> = [];
  @ViewChild('dropdown') dropdown: OverlayComponent;

  switch(): void {
    this.dropdown.switch();
  }
}
