import { Component } from '@angular/core';

import { LogoComponent } from '@core/components/logo';
import { AuthorizedUserComponent } from '@root/components/authorized-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [AuthorizedUserComponent, LogoComponent],
})
export class HeaderComponent { }
