import { Component, Input, ViewChild } from '@angular/core';

import { EOverlayPosition, IDropdownItem } from 'src/app/core/models';
import { OverlayComponent } from 'src/app/modules/shared/components/overlay/overlay.component';

@Component({
  selector: 'app-ellipsis-dropdown',
  templateUrl: './ellipsis-dropdown.component.html',
  styleUrls: ['./ellipsis-dropdown.component.scss']
})
export class EllipsisDropdownComponent {
  @Input() position: EOverlayPosition;
  @Input() dropdownItems: IDropdownItem[] = [];
  @ViewChild('dropdown') dropdown: OverlayComponent;

  switch(): void {
    this.dropdown.switch();
  }
}
