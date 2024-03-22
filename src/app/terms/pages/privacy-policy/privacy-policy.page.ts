import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const imports = [RouterLink];
@Component({
  imports,
  selector: 'app-privacy-policy-page',
  standalone: true,
  styleUrl: 'privacy-policy.page.scss',
  templateUrl: 'privacy-policy.page.html',
})
export class PrivacyPolicyPage { }
