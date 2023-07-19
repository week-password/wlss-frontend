import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';

import {
  CustomTemplateRef,
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  ISnackbarData
} from 'src/app/core/models';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { BaseComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('cookieText') cookieText: CustomTemplateRef;

  private readonly bannerTitle = 'Добро пожаловать в Wisher - сервис по исполнению желаний!';
  private readonly bannerButtonText = 'Понятно';
  private readonly bannerWidth = 324;

  constructor(private snackBar: MatSnackBar) {
    super();
  }

  ngAfterViewInit(): void {
    const cookieBannerDismissed = localStorage.getItem('cookie-banner-dismissed');
    if (!cookieBannerDismissed) {
      this.showCookieBanner();
    }
  }

  private showCookieBanner(): void {
    const data: ISnackbarData = {
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
