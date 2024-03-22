import { Component } from '@angular/core';

import { LogoComponent } from '@core/components/logo';
import { AuthorizedUserComponent } from '@root/components/authorized-user';

const imports = [AuthorizedUserComponent, LogoComponent];
@Component({
  imports,
  selector: 'app-header',
  standalone: true,
  styleUrl: 'header.component.scss',
  templateUrl: 'header.component.html',
})
export class HeaderComponent { }
