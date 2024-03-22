import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { ButtonComponent } from '@core/components/button';
import { CardComponent } from '@core/components/card';
import { SnackbarComponent } from '@core/components/snackbar';
import {
  EAvatarType,
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TSnackbarData,
} from '@core/models/client';
import { UiStateService } from '@root/services/state';
import { WishActionsComponent } from '@wish/components/wish-actions';
import { WishFormComponent } from '@wish/components/wish-form';
import { EBookingStatus, TWish } from '@wish/models/client';
import { BookingService, WishService } from '@wish/services/client';

const imports = [ButtonComponent, CardComponent, NgFor, NgIf, WishActionsComponent, WishFormComponent];
@Component({
  imports,
  selector: 'app-wishes',
  standalone: true,
  styleUrl: 'wishes.component.scss',
  templateUrl: 'wishes.component.html',
})
export class WishesComponent extends BaseComponent implements OnInit {
  @Input() accountId: number;
  @Input() editableItems: boolean;
  @Input() wishes: Array<TWish> = [];

  @Output() update = new EventEmitter<void>();

  @ViewChild('wishForm') wishForm: WishFormComponent;

  mobile = false;
  readonly EAvatarType = EAvatarType;
  readonly EBookingStatus = EBookingStatus;

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private uiStateService: UiStateService,
    private wishService: WishService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnMobileChanges();
  }

  showWishControls(wish: TWish): boolean {
    if (wish.bookingStatus) {
      return wish.bookingStatus !== EBookingStatus.bookedByAnotherAccount;
    }
    return this.editableItems;
  }

  getBadge(wish: TWish): string | null {
    return (
      wish.bookingStatus === EBookingStatus.bookedByAnotherAccount ||
      wish.bookingStatus === EBookingStatus.bookedByCurrentAccount ?
        'забронировано' :
        null
    );
  }

  openWishFormDialog(wish: TWish | null = null): void {
    this.wishForm.openDialog(wish);
  }

  saveWish(wish: TWish): void {
    if (wish.id) {
      this.updateWish(wish);
      return;
    }
    this.createWish(wish);
  }

  removeWish(wish: TWish): void {
    this.wishService.removeWish(this.accountId, wish.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.wishForm.closeDialog();
        this.update.emit();
      },
      error: () => {
        this.wishForm.removeLoading = false;
      },
    });
  }

  createBooking(wish: TWish): void {
    this.bookingService.createBooking(this.accountId, wish.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.update.emit();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status !== 400) {
          return;
        }
        const data: TSnackbarData = {
          width: this.mobile ? 270 : 360,
          catPosition: EPosition.top,
          textAlign: ETextPosition.right,
          view: ESnackbarView.error,
          text: `Желание <b class="d-inline">${wish.title}</b> уже забронировано другим пользователем`,
        };

        this.snackBar.openFromComponent(SnackbarComponent, {
          data,
          horizontalPosition: EMatSnackbarHPosition.end,
          verticalPosition: EMatSnackbarVPosition.top,
          duration: 5000,
        });
        this.update.emit();
      },
    });
  }

  removeBooking(wish: TWish): void {
    if (!wish.bookingId) {
      return;
    }
    this.bookingService.removeBooking(this.accountId, wish.id, wish.bookingId).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.update.emit();
    });
  }

  private createWish(wish: Omit<TWish, 'id'>): void {
    this.wishService.createWish(this.accountId, wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.wishForm.closeDialog();
        this.update.emit();
      },
      error: () => {
        this.wishForm.loading = false;
      },
    });
  }

  private updateWish(wish: TWish): void {
    this.wishService.updateWish(this.accountId, wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.wishForm.closeDialog();
        this.update.emit();
      },
      error: () => {
        this.wishForm.loading = false;
      },
    });
  }

  private subscribeOnMobileChanges(): void {
    this.uiStateService.mobile.pipe(
      takeUntil(this.destroy$),
    ).subscribe((mobile: boolean) => {
      this.mobile = mobile;
    });
  }
}
