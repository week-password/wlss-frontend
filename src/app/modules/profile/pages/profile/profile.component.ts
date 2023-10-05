import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs';

import { EBlockState, IDialogData, IProfile } from 'src/app/core/models';
import { ProfileService } from 'src/app/core/services';
import { UserStateService } from 'src/app/core/state';
import { WishFormComponent } from 'src/app/modules/profile/components/wish-form/wish-form.component';
import { ProfileStateService } from 'src/app/modules/profile/core/state';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { BaseComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  @ViewChild ('wishForm') wishForm: WishFormComponent;

  profile: IProfile | null = null;
  EBlockState = EBlockState;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private profileStateService: ProfileStateService,
    private userStateService: UserStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnRouteParamsChanges();
    this.subscribeOnProfileChanges();
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
    this.wishForm.openDialog();
  }

  private subscribeOnRouteParamsChanges(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      this.getProfile(params?.login);
    });
  }

  private subscribeOnProfileChanges(): void {
    this.profileStateService.profile.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profile = profile;
    });
  }

  private getProfile(login: string | null): void {
    const profileSource = login ?
      this.profileService.getProfile(login) :
      this.userStateService.profile;

    profileSource.pipe(
      takeUntil(this.destroy$)
    ).subscribe((profile: IProfile | null) => {
      this.profileStateService.setProfile(profile);
    });
  }
}
