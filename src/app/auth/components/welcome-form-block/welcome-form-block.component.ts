import { Component } from '@angular/core';

import { LogoComponent } from '@core/components/logo';

@Component({
  selector: 'app-welcome-form-block',
  templateUrl: './welcome-form-block.component.html',
  styleUrls: ['./welcome-form-block.component.scss'],
  standalone: true,
  imports: [LogoComponent],
})
export class WelcomeFormBlockComponent { }
