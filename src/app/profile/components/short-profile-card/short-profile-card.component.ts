import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AvatarComponent } from '@core/components/avatar';
import { TProfile } from '@profile/models/client';

const imports = [AvatarComponent, NgIf, RouterLink];
@Component({
  imports,
  selector: 'app-short-profile-card',
  standalone: true,
  styleUrl: 'short-profile-card.component.scss',
  templateUrl: 'short-profile-card.component.html',
})
export class ShortProfileCardComponent {
  @Input() profile: TProfile;
}
