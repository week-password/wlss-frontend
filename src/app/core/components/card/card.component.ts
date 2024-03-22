import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AvatarComponent } from '@core/components/avatar';
import { EAvatarType } from '@core/models/client';

const imports = [AvatarComponent, NgIf];
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
  selector: 'app-card',
  standalone: true,
  styleUrl: 'card.component.scss',
  templateUrl: 'card.component.html',
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
