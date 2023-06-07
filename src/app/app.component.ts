import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get showHeader(): boolean {
    return ['signin', 'signup'].every((path: string) => !window.location.pathname.includes(path));
  }
}
