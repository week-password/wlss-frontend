import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';

import { EOverlayPosition, OverlayPositions } from '@core/models/client';

const imports = [CdkConnectedOverlay];
@Component({
  imports,
  selector: 'app-overlay',
  standalone: true,
  styleUrl: 'overlay.component.scss',
  templateUrl: 'overlay.component.html',
})
export class OverlayComponent {
  @Input() trigger: CdkOverlayOrigin;
  @Input() position: EOverlayPosition = EOverlayPosition.bottomCenter;
  @Input() closeAfterClick = true;

  isOpen = false;

  get overlayPosition(): Array<ConnectedPosition> {
    return OverlayPositions[this.position];
  }

  switch(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}
