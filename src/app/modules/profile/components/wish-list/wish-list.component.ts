import { Component, Input, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EAvatarType, EBaseColor, EBookingStatus, IDialogData, IWish, IWishBookingStatus } from '@core/models';
import { WishService } from '@core/services';
import { WishFormComponent } from '@modules/profile/components/wish-form';
import { BaseComponent } from '@shared/base-components';
import { DialogComponent } from '@shared/components/dialog';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent extends BaseComponent {
  @Input() showActions: boolean;
  @Input() editableItems: boolean;

  @ViewChild('wishForm') wishForm: WishFormComponent;
  @ViewChildren('removeWishMessages') removeWishMessages: QueryList<TemplateRef<HTMLElement>>;

  wishes: Array<IWish & IWishBookingStatus> = [];
  readonly EAvatarType = EAvatarType;
  readonly EBookingStatus = EBookingStatus;

  constructor(private wishService: WishService, private matDialog: MatDialog) {
    super();
    this.getWishes();
  }

  getBadge(wish: IWish & IWishBookingStatus): string | null {
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

  openWishFormDialog(wish: IWish | null = null): void {
    const dialogRef = this.wishForm.openDialog(wish);
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((wishFormResult: Omit<IWish, 'id'> | null) => {
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

  openRemoveWishDialog(wish: IWish): void {
    const { id } = wish;
    const index = this.wishes.findIndex((wish: IWish) => wish.id === id);
    const removeWishDialogData: IDialogData = {
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
      takeUntil(this.destroy$)
    ).subscribe((removeSubmitted: boolean) => {
      if (removeSubmitted) {
        this.wishForm.closeDialog();
        this.removeWish(wish);
      }
    });
  }

  private addWish(wish: Omit<IWish, 'id'>): void {
    this.wishService.addWish(wish).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private updateWish(wish: IWish): void {
    this.wishService.updateWish(wish).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private removeWish(wish: IWish): void {
    this.wishService.removeWish(wish).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getWishes();
    });
  }

  private getWishes(): void {
    this.wishService.getWishes().pipe(
      takeUntil(this.destroy$)
    ).subscribe((wishes: Array<IWish & IWishBookingStatus>) => {
      this.wishes = wishes;
    });
  }
}
