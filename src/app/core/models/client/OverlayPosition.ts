import { ConnectedPosition } from '@angular/cdk/overlay';

export enum EOverlayPosition {
  bottomCenter = 'bottomCenter',
  bottomStart = 'bottomStart',
  bottomEnd = 'bottomEnd',
  topCenter = 'topCenter',
  topStart = 'topStart',
  topEnd = 'topEnd',
}

export const OverlayPositions: { [key in EOverlayPosition]: Array<ConnectedPosition> } = {
  [EOverlayPosition.bottomCenter]: [{
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  }],
  [EOverlayPosition.bottomStart]: [{
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  }],
  [EOverlayPosition.bottomEnd]: [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  }],
  [EOverlayPosition.topCenter]: [{
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  }],
  [EOverlayPosition.topStart]: [{
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  }],
  [EOverlayPosition.topEnd]: [{
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  }],
};
