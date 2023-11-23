import { Component, Input, ViewChild } from '@angular/core';

import { EOverlayPosition, IDropdownItem } from '@core/models';
import { OverlayComponent } from '@shared/components/overlay';

@Component({
  selector: 'app-ellipsis-dropdown',
  templateUrl: './ellipsis-dropdown.component.html',
  styleUrls: ['./ellipsis-dropdown.component.scss']
})
export class EllipsisDropdownComponent {
  @Input() position: EOverlayPosition;
  @Input() dropdownItems: Array<IDropdownItem> = [];
  @ViewChild('dropdown') dropdown: OverlayComponent;

  switch(): void {
    this.dropdown.switch();
  }
}
