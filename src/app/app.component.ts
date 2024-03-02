import { Component, HostListener } from '@angular/core';

import { UiStateService } from './core/state/ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private uiStateService: UiStateService) { }

  get showHeader(): boolean {
    return ['signin', 'signup'].every((path: string) => !window.location.pathname.includes(path));
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.uiStateService.updateViewportWidth();
    this.uiStateService.updateMobile();
  }
}
