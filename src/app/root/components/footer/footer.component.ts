import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  styleUrl: 'footer.component.scss',
  templateUrl: 'footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
