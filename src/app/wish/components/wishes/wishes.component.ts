import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { DialogComponent } from '@core/components/dialog';
import { IconComponent } from '@core/components/icon';
import { EAvatarType, EBaseColor, TDialogData } from '@core/models/client';
import { UiStateService } from '@root/services/state';
import { WishActionsComponent } from '@wish/components/wish-actions';
import { WishFormComponent } from '@wish/components/wish-form';
import { EBookingStatus, TWish } from '@wish/models/client';
import { WishService } from '@wish/services/client';

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
  @ViewChildren('removeWishMessages') removeWishMessages: QueryList<TemplateRef<HTMLElement>>;

  mobile = false;
  readonly EAvatarType = EAvatarType;
  readonly EBookingStatus = EBookingStatus;

  constructor(
    private matDialog: MatDialog,
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
    const { id } = wish;
    const index = this.wishes.findIndex((wish: TWish) => wish.id === id);
    const removeWishDialogData: TDialogData = {
      cancelButtonText: 'Отменить',
      contentTemplate: this.removeWishMessages.get(index),
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
