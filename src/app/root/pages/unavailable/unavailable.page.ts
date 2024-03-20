import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { HealthCheckApiService } from '@root/services/api';

@Component({
  selector: 'app-unavailable-page',
  templateUrl: './unavailable.page.html',
  styleUrls: ['./unavailable.page.scss'],
  standalone: true,
})
export class UnavailablePage extends BaseComponent implements OnInit {
  private intervalId: number;

  constructor(
    private healthCheckApiService: HealthCheckApiService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.checkApiHeath();
    this.intervalId = window.setInterval(() => this.checkApiHeath(), 3000);
  }

  private checkApiHeath(): void {
    this.healthCheckApiService.getHealth().pipe(takeUntil(this.destroy$)).subscribe(() => {
      window.clearInterval(this.intervalId);
      this.router.navigate(['']);
    });
  }
}
