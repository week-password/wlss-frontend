import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const imports = [RouterLink];
@Component({
  imports,
  selector: 'app-user-agreement-page',
  standalone: true,
  styleUrl: 'user-agreement.page.scss',
  templateUrl: 'user-agreement.page.html',
})
export class UserAgreementPage { }
