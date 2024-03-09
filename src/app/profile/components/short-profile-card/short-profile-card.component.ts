import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AvatarComponent } from '@core/components/avatar';
import { LinkDirective } from '@core/directives';
import { TProfile } from '@profile/models/client';

@Component({
  selector: 'app-short-profile-card',
  templateUrl: './short-profile-card.component.html',
  styleUrls: ['./short-profile-card.component.scss'],
  standalone: true,
  imports: [AvatarComponent, LinkDirective, NgIf],
})
export class ShortProfileCardComponent {
  @Input() profile: TProfile;
}
