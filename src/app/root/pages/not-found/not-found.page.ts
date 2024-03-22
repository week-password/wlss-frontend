import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  styleUrl: 'not-found.page.scss',
  templateUrl: 'not-found.page.html',
})
export class NotFoundPage {
  variant = new Date().getMilliseconds() % 2;
}
