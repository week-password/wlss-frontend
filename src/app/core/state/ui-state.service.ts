import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const mobileMaxWidth = 768;
@Injectable({ providedIn: 'root' })
export class UiStateService {
  private viewportWidth$ = new BehaviorSubject<number>(window.innerWidth);
  private mobile$ = new BehaviorSubject<boolean>(window.innerWidth <= mobileMaxWidth);

  get viewportWidth(): Observable<number> {
    return this.viewportWidth$.asObservable();
  }
  get mobile(): Observable<boolean> {
    return this.mobile$.asObservable();
  }

  updateViewportWidth(): void {
    const viewportWidth = window.innerWidth;
    if (viewportWidth === this.viewportWidth$.value) {
      return;
    }
    this.viewportWidth$.next(window.innerWidth);
  }
  updateMobile(): void {
    const mobile = window.innerWidth <= mobileMaxWidth;
    if (mobile === this.mobile$.value) {
      return;
    }
    this.mobile$.next(mobile);
  }
}
