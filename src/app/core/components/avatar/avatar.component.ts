import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AvatarSources, EAvatarType } from '@core/models/client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, NgIf],
})
export class AvatarComponent {
  @Input() type: EAvatarType = EAvatarType.profile;
  @Input() avatarId: string | null;

  AvatarSources = AvatarSources;

  get source(): string | null {
    return this.avatarId ? `${environment.bff.filesUrl}/${this.avatarId}` : null;
  }
}
