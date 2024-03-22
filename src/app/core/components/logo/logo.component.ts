import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const imports = [RouterLink];
@Component({
  imports,
  selector: 'app-logo',
  standalone: true,
  styleUrl: 'logo.component.scss',
  templateUrl: 'logo.component.html',
})
export class LogoComponent { }
