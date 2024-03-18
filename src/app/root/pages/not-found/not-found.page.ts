import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
})
export class NotFoundPage {
  variant = new Date().getMilliseconds() % 2;
}
