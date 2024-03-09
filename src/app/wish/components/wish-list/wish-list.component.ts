import { NgFor, NgIf } from '@angular/common';
import { Component, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { CardComponent } from '@core/components/card';
import { DialogComponent } from '@core/components/dialog';
import { EAvatarType, EBaseColor, TDialogData } from '@core/models/client';
import { WishActionsComponent } from '@wish/components/wish-actions';
import { WishFormComponent } from '@wish/components/wish-form';
import { EBookingStatus, TWish, TWishBookingStatus } from '@wish/models/client';
import { WishService } from '@wish/services/client';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, WishActionsComponent, WishFormComponent],
})
export class WishListComponent extends BaseComponent {
  @Input() showActions: boolean;
  @Input() editableItems: boolean;

  @ViewChild('wishForm') wishForm: WishFormComponent;
  @ViewChildren('removeWishMessages') removeWishMessages: QueryList<TemplateRef<HTMLElement>>;

  wishes: Array<TWish & TWishBookingStatus> = [];
  readonly EAvatarType = EAvatarType;
  readonly EBookingStatus = EBookingStatus;

  constructor(private wishService: WishService, private matDialog: MatDialog) {
    super();
    this.getWishes();
  }

  getBadge(wish: TWish & TWishBookingStatus): string | null {
    if (!this.showActions) {
      return null;
    }
    return (
      wish.bookingStatus === EBookingStatus.bookedByAnotherUser ||
      wish.bookingStatus === EBookingStatus.bookedByCurrentUser ?
        'забронировано' :
        null
    );
  }

  openWishFormDialog(wish: TWish | null = null): void {
    const dialogRef = this.wishForm.openDialog(wish);
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((wishFormResult: Omit<TWish, 'id'> | null) => {
      if (!wishFormResult) {
        return;
      }
      if (wish) {
        this.updateWish({ id: wish.id, ...wishFormResult });
        return;
      }
      this.addWish(wishFormResult);
    });
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
        this.wishForm.closeDialog();
        this.removeWish(wish);
      }
    });
  }

  private addWish(wish: Omit<TWish, 'id'>): void {
    this.wishService.addWish(wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private updateWish(wish: TWish): void {
    this.wishService.updateWish(wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private removeWish(wish: TWish): void {
    this.wishService.removeWish(wish).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private getWishes(): void {
    this.wishService.getWishes().pipe(
      takeUntil(this.destroy$),
    ).subscribe((wishes: Array<TWish & TWishBookingStatus>) => {
      this.wishes = wishes;
    });
  }
}
