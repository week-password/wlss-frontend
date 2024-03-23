import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AvatarSources, EAvatarType } from '@core/models/client';
import { environment } from 'src/environments/environment';

const imports = [AngularSvgIconModule, NgIf];
@Component({
  imports,
  selector: 'app-avatar',
  standalone: true,
  styleUrl: 'avatar.component.scss',
  templateUrl: 'avatar.component.html',
})
export class AvatarComponent {
  @Input() avatarId: string | null;
  @Input() type: EAvatarType = EAvatarType.profile;

  readonly AvatarSources = AvatarSources;

  get source(): string | null {
    return this.avatarId ? `${environment.bff.host}:${environment.bff.port}${environment.bff.filesUrl}/${this.avatarId}` : null;
  }
}
