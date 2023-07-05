import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EOverlayPosition, IDialogData } from 'src/app/core/models';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss']
})
export class AuthorizedUserComponent {
  menuOpened = false;
  menuItems = [
    {
      value: 'Профиль',
      action: this.goToProfile.bind(this)
    },
    {
      value: 'Настройки',
      action: this.openProfileSettings.bind(this)
    },
    {
      value: 'Выход',
      action: this.logout.bind(this)
    },
  ];
  EOverlayPosition = EOverlayPosition;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  private goToProfile(): void {
    this.router.navigate(['profile']);
  }
  private openProfileSettings(): void {
    const profileSettingsDialogData: IDialogData = {
      title: 'Редактирование профиля',
      cancelButtonText: 'Отменить',
      submitButtonText: 'Сохранить',
    };
    this.dialog.open(DialogComponent, {
      width: '640px',
      data: profileSettingsDialogData,
    });
  }
  private logout(): void {
    this.router.navigate(['signin']);
  }
}
