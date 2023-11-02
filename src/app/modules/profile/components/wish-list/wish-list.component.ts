import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { EBaseColor, IDialogData } from 'src/app/core/models';
import { WishService } from 'src/app/core/services';
import { WishFormComponent } from 'src/app/modules/profile/components/wish-form/wish-form.component';
import { IWish } from 'src/app/modules/profile/core/models';
import { BaseComponent } from 'src/app/modules/shared/base-components';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent extends BaseComponent {
  @ViewChild('wishForm') wishForm: WishFormComponent;
  @ViewChildren('removeWishMessages') removeWishMessages: QueryList<TemplateRef<HTMLElement>>;

  wishes: IWish[] = [];

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
    ).subscribe((wishes: IWish[]) => {
      this.wishes = wishes;
    });
  }
}
