import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileSettingsService {
  private openProfileSettingsEvent = new EventEmitter<void>();

  get openProfileSettingsEventObserver(): Observable<void> {
    return this.openProfileSettingsEvent.asObservable();
  }

  openProfileSettings(): void {
    this.openProfileSettingsEvent.emit();
  }
}
