import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EOverlayPosition } from 'src/app/core/models';

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

  constructor(private router: Router) { }

  private goToProfile(): void {
    this.router.navigate(['profile']);
  }
  private openProfileSettings(): void {
    return;
  }
  private logout(): void {
    this.router.navigate(['signin']);
  }
}
