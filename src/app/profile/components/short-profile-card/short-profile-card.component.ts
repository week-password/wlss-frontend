import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AvatarComponent } from '@core/components/avatar';
import { TProfile } from '@profile/models/client';

@Component({
  selector: 'app-short-profile-card',
  templateUrl: './short-profile-card.component.html',
  styleUrls: ['./short-profile-card.component.scss'],
  standalone: true,
  imports: [AvatarComponent, NgIf, RouterLink],
})
export class ShortProfileCardComponent {
  @Input() profile: TProfile;
}
