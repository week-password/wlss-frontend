import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseFormComponent } from '@core/base-components';
import { InputComponent } from '@core/components/input';
import { RestrictWhitespacesDirective } from '@core/directives';
import { TProfilesFilter, TProfilesFilterFormGroup } from '@profiles/models/client';

const imports = [
  FormsModule,
  InputComponent,
  ReactiveFormsModule,
  RestrictWhitespacesDirective,
];
@Component({
  imports,
  selector: 'app-profiles-filter',
  standalone: true,
  styleUrl: 'profiles-filter.component.scss',
  templateUrl: 'profiles-filter.component.html',
})
export class ProfilesFilterComponent extends BaseFormComponent<TProfilesFilterFormGroup> implements OnInit {
  @Output() filter = new EventEmitter<TProfilesFilter>();

  ngOnInit(): void {
    this.initProfilesFilterForm();
    this.subscribeOnProfilesFilterFormChanges();
  }

  private initProfilesFilterForm(): void {
    this.form = this.fb.group<TProfilesFilterFormGroup>({
      login: this.fb.control<string>('', { nonNullable: true }),
      name: this.fb.control<string>('', { nonNullable: true }),
    });
  }

  private subscribeOnProfilesFilterFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const filter = this.form.value as TProfilesFilter;
      const lowerCaseFilter: TProfilesFilter = {
        login: filter.login.toLowerCase(),
        name: filter.name.toLowerCase(),
      };
      this.filter.emit(lowerCaseFilter);
    });
  }
}
