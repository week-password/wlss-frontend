import { Platform } from '@angular/cdk/platform';
import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CookieBannerComponent } from '@root/components/cookie-banner';
import { FooterComponent } from '@root/components/footer';
import { HeaderComponent } from '@root/components/header';
import { HealtCheckApiService } from '@root/services/api';
import { UiStateService } from '@root/services/state';

@Component({
  selector: 'app-root-page',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
  standalone: true,
  imports: [CookieBannerComponent, FooterComponent, HeaderComponent, NgIf, RouterOutlet],
})
export class RootPage extends BaseComponent implements OnInit {
  constructor(
    private healtCheckService: HealtCheckApiService,
    private uiStateService: UiStateService,
    private platform: Platform,
  ) {
    super();
  }

  get showHeader(): boolean {
    return ['signin', 'signup'].every((path: string) => !window.location.pathname.includes(path));
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.uiStateService.updateViewportWidth();
    this.uiStateService.updateMobile();
  }

  ngOnInit(): void {
    this.healtCheckService.getHealth().pipe(takeUntil(this.destroy$)).subscribe();
    this.checkFirefoxBrowser();
  }

  private checkFirefoxBrowser(): void {
    if (this.platform.FIREFOX) {
      document.getElementsByTagName('html')[0].classList.add('firefox');
    }
  }
}
