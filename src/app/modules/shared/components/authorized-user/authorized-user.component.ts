import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { EOverlayPosition, IAccount, IDialogData, IProfile } from 'src/app/core/models';
import { AccountService, ProfileService } from 'src/app/core/services';
import { UserStateService } from 'src/app/core/state';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { BaseComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss']
})
export class AuthorizedUserComponent extends BaseComponent implements OnInit {
  account: IAccount | null = null;
  profile: IProfile | null = null;
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
    private accountService: AccountService,
    private profileService: ProfileService,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAuthorizedUser();
    this.subscribeOnAccountChanges();
    this.subscribeOnProfileChanges();
  }

  private getAuthorizedUser(): void {
    this.accountService.getAccount().pipe(
      takeUntil(this.destroy$)
    ).subscribe((account: IAccount) => {
      this.userStateService.setAccount(account);
      this.profileService.getProfile(account.login).pipe(
        takeUntil(this.destroy$)
      ).subscribe((profile: IProfile) => {
        this.userStateService.setProfile(profile);
      });
    });
  }

  private subscribeOnAccountChanges(): void {
    this.userStateService.account.pipe(
      takeUntil(this.destroy$)
    ).subscribe((account: IAccount | null) => {
      this.account = account;
    });
  }

  private subscribeOnProfileChanges(): void {
    this.userStateService.profile.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profile = profile;
    });
  }

  private goToProfile(): void {
    this.router.navigate(['profile', this.account?.login]);
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
    this.userStateService.setAccount(null);
    this.userStateService.setProfile(null);
    this.router.navigate(['signin']);
  }
}
