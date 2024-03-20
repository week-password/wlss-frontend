import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseFormComponent } from '@core/base-components';
import { InputComponent } from '@core/components/input';
import { DisableRepeatWhitespacesDirective, TrimStartWhitespacesDirective } from '@core/directives';
import { TProfilesFilter, TProfilesFilterFormGroup } from '@profiles/models/client';

@Component({
  selector: 'app-profiles-filter',
  templateUrl: './profiles-filter.component.html',
  styleUrls: ['./profiles-filter.component.scss'],
  standalone: true,
  imports: [
    DisableRepeatWhitespacesDirective,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    TrimStartWhitespacesDirective,
  ],
})
export class ProfilesFilterComponent extends BaseFormComponent<TProfilesFilterFormGroup> implements OnInit {
  @Output() filter = new EventEmitter<TProfilesFilter>();

  constructor() {
    super();
  }

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
