import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { DialogComponent } from '@core/components/dialog';
import { IconComponent } from '@core/components/icon';
import { SnackbarComponent } from '@core/components/snackbar';
import {
  EAvatarType,
  EBaseColor,
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TDialogData,
  TSnackbarData,
} from '@core/models/client';
import { UiStateService } from '@root/services/state';
import { WishActionsComponent } from '@wish/components/wish-actions';
import { WishFormComponent } from '@wish/components/wish-form';
import { EBookingStatus, TWish } from '@wish/models/client';
import { BookingService, WishService } from '@wish/services/client';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
  standalone: true,
  imports: [CardComponent, IconComponent, NgFor, NgIf, WishActionsComponent, WishFormComponent],
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
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private uiStateService: UiStateService,
    private wishService: WishService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnMobileChanges();
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

  openRemoveWishDialog(wish: TWish): void {
    const removeWishDialogData: TDialogData = {
      cancelButtonText: 'Отменить',
      content:
        `<div class="d-flex flex-column">
          <div class="mb-10">Вы действительно хотите удалить желание <b class="d-inline">${wish.title}</b>?</div>
          <div class="mb-10">Отменить это действие будет <b class="d-inline">невозможно</b>.</div>
          <div>Если кто-то забронировал это желание, то он потеряет к нему доступ после удаления.</div>
        </div>`,
      submitButtonColor: EBaseColor.danger,
      submitButtonText: 'Удалить',
      title: 'Удаление желания',
    };
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: removeWishDialogData,
      maxWidth: '640px',
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((removeSubmitted: boolean) => {
      if (removeSubmitted) {
        this.removeWish(wish);
      }
    });
  }

  saveWish(wish: TWish): void {
    if (wish.id) {
      this.updateWish(wish);
      return;
    }
    this.createWish(wish);
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
    ).subscribe(() => {
      this.wishForm.closeDialog();
      this.update.emit();
    });
  }

  private updateWish(wish: TWish): void {
    this.wishService.updateWish(this.accountId, wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.wishForm.closeDialog();
      this.update.emit();
    });
  }

  private removeWish(wish: TWish): void {
    this.wishService.removeWish(this.accountId, wish.id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.wishForm.closeDialog();
      this.update.emit();
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
