import { Component, Input } from '@angular/core';

import { IProfile } from 'src/app/core/models';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() profile: IProfile;
}
