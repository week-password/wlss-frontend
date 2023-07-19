import { Component, Input } from '@angular/core';

import { EAvatarType } from 'src/app/core/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() type: EAvatarType = EAvatarType.profile;
  @Input() source: string | null;

  EAvatarType = EAvatarType;
}
