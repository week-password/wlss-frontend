import { Component } from '@angular/core';

import { LogoComponent } from '@core/components/logo';

const imports = [LogoComponent];
@Component({
  imports,
  selector: 'app-welcome-form-block',
  standalone: true,
  styleUrl: 'welcome-form-block.component.scss',
  templateUrl: 'welcome-form-block.component.html',
})
export class WelcomeFormBlockComponent { }
