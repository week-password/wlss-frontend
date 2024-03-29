import { Platform } from '@angular/cdk/platform';
import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs';

import { SessionStateService } from '@auth/services/state';
import { BaseComponent } from '@core/base-components';
import { CookieBannerComponent } from '@root/components/cookie-banner';
import { FooterComponent } from '@root/components/footer';
import { HeaderComponent } from '@root/components/header';
import { HealthCheckApiService } from '@root/services/api';
import { UiStateService } from '@root/services/state';

const imports = [CookieBannerComponent, FooterComponent, HeaderComponent, NgIf, RouterOutlet];
@Component({
  imports,
  selector: 'app-root-page',
  standalone: true,
  styleUrl: 'root.page.scss',
  templateUrl: 'root.page.html',
})
export class RootPage extends BaseComponent implements OnInit {
  constructor(
    private readonly healthCheckApiService: HealthCheckApiService,
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly sessionStateService: SessionStateService,
    private readonly uiStateService: UiStateService,
  ) {
    super();
  }

  get showHeader(): boolean {
    return this.sessionStateService.isLoggedIn && !window.location.pathname.includes('unavailable');
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.uiStateService.updateViewportWidth();
    this.uiStateService.updateMobile();
  }

  ngOnInit(): void {
    this.checkApiHeath();
    this.checkFirefoxBrowser();
  }

  private checkApiHeath(): void {
    this.healthCheckApiService.getHealth().pipe(takeUntil(this.destroy$)).subscribe({
      error: () => this.router.navigate(['unavailable']),
    });
  }

  private checkFirefoxBrowser(): void {
    if (this.platform.FIREFOX) {
      document.getElementsByTagName('html')[0].classList.add('firefox');
    }
  }
}
