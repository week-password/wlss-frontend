import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const imports = [MatIconModule];
@Component({
  imports,
  selector: 'app-icon',
  standalone: true,
  styleUrl: 'icon.component.scss',
  templateUrl: 'icon.component.html',
})
export class IconComponent {
  @Input() icon: string;
}
