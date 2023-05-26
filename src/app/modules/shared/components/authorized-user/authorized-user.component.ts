import { Component } from '@angular/core';
import { EOverlayPosition } from 'src/app/core/models/OverlayPosition';

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
      action: this.goToProfile
    },
    {
      value: 'Настройки',
      action: this.openProfileSettings
    },
    {
      value: 'Выход',
      action: this.logout
    },
  ];
  EOverlayPosition = EOverlayPosition;

  private goToProfile(): void {
    return;
  }
  private openProfileSettings(): void {
    return;
  }
  private logout(): void {
    return;
  }
}
