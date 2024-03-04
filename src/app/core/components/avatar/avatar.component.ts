import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AvatarSources, EAvatarType } from '@core/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, NgIf],
})
export class AvatarComponent {
  @Input() type: EAvatarType = EAvatarType.profile;
  @Input() source: string | null;

  AvatarSources = AvatarSources;
}
