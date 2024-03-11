import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AvatarComponent } from '@core/components/avatar';
import { EAvatarType } from '@core/models/client';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AvatarComponent, NgIf],
})
export class CardComponent {
  @Input() avatarId: string | null;
  @Input() avatarType: EAvatarType = EAvatarType.profile;
  @Input() description: string | null;
  @Input() header: string;
  @Input() headerBadge: string | null = null;
  @Input() presentationView = false;
  @Input() showControls: boolean;
}
