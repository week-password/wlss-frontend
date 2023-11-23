import { Component, Input } from '@angular/core';

import { IProfile } from '@core/models';

@Component({
  selector: 'app-short-profile-card',
  templateUrl: './short-profile-card.component.html',
  styleUrls: ['./short-profile-card.component.scss']
})
export class ShortProfileCardComponent {
  @Input() profile: IProfile;
}
