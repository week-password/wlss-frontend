import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { SnackbarComponent } from '@core/components/snackbar';
import {
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TSnackbarData,
} from '@core/models/client';

const imports = [RouterLink];
@Component({
  imports,
  selector: 'app-cookie-banner',
  standalone: true,
  styleUrl: 'cookie-banner.component.scss',
  templateUrl: 'cookie-banner.component.html',
})
export class CookieBannerComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('cookieText') cookieText: TemplateRef<HTMLElement>;

  private readonly bannerTitle = 'Добро пожаловать в Wisher - сервис по исполнению желаний!';
  private readonly bannerButtonText = 'Понятно';
  private readonly bannerWidth = 300;

  constructor(private readonly snackBar: MatSnackBar) {
    super();
  }

  ngAfterViewInit(): void {
    const cookieBannerDismissed = localStorage.getItem('cookie-banner-dismissed');
    if (!cookieBannerDismissed) {
      this.showCookieBanner();
    }
  }

  private showCookieBanner(): void {
    const data: TSnackbarData = {
      textTemplate: this.cookieText,
      title: this.bannerTitle,
      buttonText: this.bannerButtonText,
      width: this.bannerWidth,
      catPosition: EPosition.bottom,
      textAlign: ETextPosition.left,
      view: ESnackbarView.info,
    };
    const cookieBannerRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      horizontalPosition: EMatSnackbarHPosition.end,
      verticalPosition: EMatSnackbarVPosition.bottom,
    });

    cookieBannerRef.afterDismissed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      window.localStorage.setItem('cookie-banner-dismissed', 'cookie-banner-dismissed');
    });
  }

}
