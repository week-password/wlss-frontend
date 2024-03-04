import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CookieBannerComponent } from '@root/components/cookie-banner';
import { FooterComponent } from '@root/components/footer';
import { HeaderComponent } from '@root/components/header';
import { UiStateService } from '@root/state';

@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
  standalone: true,
  imports: [CookieBannerComponent, FooterComponent, HeaderComponent, NgIf, RouterOutlet],
})
export class RootPage {
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
