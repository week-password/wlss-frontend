import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { EOverlayPosition, IAccount, IProfile } from 'src/app/core/models';
import { AccountService, ProfileService } from 'src/app/core/services';
import { UserStateService } from 'src/app/core/state';
import { ProfileSettingsComponent } from 'src/app/modules/shared/components/profile-settings/profile-settings.component';
import { BaseComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-authorized-user',
  templateUrl: './authorized-user.component.html',
  styleUrls: ['./authorized-user.component.scss']
})
export class AuthorizedUserComponent extends BaseComponent implements OnInit {
  @ViewChild ('profileSettings') profileSettings: ProfileSettingsComponent;
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
    this.router.navigate(['profile']);
  }

  private openProfileSettings(): void {
    this.profileSettings.openDialog();
  }

  private logout(): void {
    this.userStateService.setAccount(null);
    this.userStateService.setProfile(null);
    this.router.navigate(['signin']);
  }
}
