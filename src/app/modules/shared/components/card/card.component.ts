import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EAvatarType } from '@core/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() avatar: string | null;
  @Input() avatarType: EAvatarType = EAvatarType.profile;
  @Input() description: string | null;
  @Input() header: string;
  @Input() headerBadge: string | null = null;
  @Input() presentationView = false;
  @Input() showControls: boolean;
}
