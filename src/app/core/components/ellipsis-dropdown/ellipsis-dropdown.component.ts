import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgFor } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { IconComponent } from '@core/components/icon';
import { OverlayComponent } from '@core/components/overlay';
import { EOverlayPosition, IDropdownItem } from '@core/models';

@Component({
  selector: 'app-ellipsis-dropdown',
  templateUrl: './ellipsis-dropdown.component.html',
  styleUrls: ['./ellipsis-dropdown.component.scss'],
  standalone: true,
  imports: [CdkOverlayOrigin, IconComponent, NgFor, OverlayComponent],
})
export class EllipsisDropdownComponent {
  @Input() position: EOverlayPosition;
  @Input() dropdownItems: Array<IDropdownItem> = [];
  @ViewChild('dropdown') dropdown: OverlayComponent;

  switch(): void {
    this.dropdown.switch();
  }
}
