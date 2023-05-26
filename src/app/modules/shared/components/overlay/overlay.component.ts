import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { EOverlayPosition, OverlayPositions } from 'src/app/core/models/OverlayPosition';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
  @Input() trigger: CdkOverlayOrigin;
  @Input() position: EOverlayPosition = EOverlayPosition.bottomCenter;

  isOpen = false;

  get overlayPosition(): ConnectedPosition[] {
    return OverlayPositions[this.position];
  }

  switch(): void {
    this.isOpen = !this.isOpen;
  }
}
