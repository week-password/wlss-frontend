import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AvatarComponent } from '@core/components/avatar';
import { EAvatarType } from '@core/models/client';

const imports = [AvatarComponent, NgIf];
@Component({
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
  @Input() visibleDescriptionLength: number;

  showFullDescription = false;

  get truncatedDescription(): string | null {
    if (!this.description) {
      return null;
    }
    if (!this.shouldTruncateDescription || this.showFullDescription) {
      return this.description;
    }
    return this.description.slice(0, this.visibleDescriptionLength) + '...';
  }

  get shouldTruncateDescription(): boolean {
    if (!this.description) {
      return false;
    }
    return !!this.visibleDescriptionLength && this.description.length > this.visibleDescriptionLength;
  }

  switchDescriptionView(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
