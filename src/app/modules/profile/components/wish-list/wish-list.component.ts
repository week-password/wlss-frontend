import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EBaseColor, IDialogData } from '@core/models';
import { WishService } from '@core/services';
import { WishFormComponent } from '@modules/profile/components/wish-form';
import { IWish } from '@modules/profile/core/models';
import { BaseComponent } from '@shared/base-components';
import { DialogComponent } from '@shared/components/dialog';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent extends BaseComponent {
  @ViewChild('wishForm') wishForm: WishFormComponent;
  @ViewChildren('removeWishMessages') removeWishMessages: QueryList<TemplateRef<HTMLElement>>;

  wishes: Array<IWish> = [];

  constructor(private wishService: WishService, private matDialog: MatDialog) {
    super();
    this.getWishes();
  }

  openWishFormDialog(wish: IWish | null = null): void {
    const dialogRef = this.wishForm.openDialog(wish);
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((wishFormResult: IWish | null) => {
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

  openRemoveWishDialog(wish: IWish, index: number): void {
    const removeWishDialogData: IDialogData = {
      cancelButtonText: 'Отменить',
      contentTemplate: this.removeWishMessages.get(index),
      submitButtonColor: EBaseColor.danger,
      submitButtonText: 'Удалить',
      title: 'Удаление желания',
    };
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: removeWishDialogData,
      width: '640px',
    });
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((removeSubmitted: boolean) => {
      if (removeSubmitted) {
        this.removeWish(wish);
      }
    });
  }

  private addWish(wish: IWish): void {
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
    ).subscribe((wishes: Array<IWish>) => {
      this.wishes = wishes;
    });
  }
}
