import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ButtonComponent } from '@core/components/button';

const imports = [AngularSvgIconModule, ButtonComponent, NgIf, RouterLink];
@Component({
  imports,
  selector: 'app-cookie-banner',
  standalone: true,
  styleUrl: 'cookie-banner.component.scss',
  templateUrl: 'cookie-banner.component.html',
})
export class CookieBannerComponent {
  dismissed = !!localStorage.getItem('cookie-banner-dismissed');

  dismiss(): void {
    this.dismissed = true;
    window.localStorage.setItem('cookie-banner-dismissed', 'cookie-banner-dismissed');
  }
}
