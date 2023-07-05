import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EBlockState, IDialogData } from 'src/app/core/models';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string;

  EBlockState = EBlockState;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;
  }

  openAddFriendDialog(): void {
    const addFriendDialogData: IDialogData = {
      title: 'Добавление друга',
      cancelButtonText: 'Отменить',
      submitButtonText: 'Отправить заявку',
    };
    this.dialog.open(DialogComponent, {
      width: '640px',
      data: addFriendDialogData,
    });
  }

  openAddWishDialog(): void {
    const addWishDialogData: IDialogData = {
      title: 'Добавление желания',
      cancelButtonText: 'Отменить',
      submitButtonText: 'Сохранить',
    };
    this.dialog.open(DialogComponent, {
      width: '640px',
      data: addWishDialogData,
    });
  }
}
