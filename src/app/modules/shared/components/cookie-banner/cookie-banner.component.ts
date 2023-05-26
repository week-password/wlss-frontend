import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cookieText') cookieText: CustomTemplateRef;

  private readonly bannerTitle = 'Добро пожаловать в Wisher - сервис по исполнению желаний!';
  private readonly bannerButtonText = 'Понятно';
  private readonly bannerWidth = 324;
  private destroy$ = new Subject<void>();

  constructor(private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    const cookieBannerDismissed = localStorage.getItem('cookie-banner-dismissed');
    if (!cookieBannerDismissed) {
      this.showCookieBanner();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
