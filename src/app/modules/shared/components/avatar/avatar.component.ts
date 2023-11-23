import { Component, Input } from '@angular/core';

import { AvatarSources, EAvatarType } from '@core/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() type: EAvatarType = EAvatarType.profile;
  @Input() source: string | null;

  AvatarSources = AvatarSources;
}
