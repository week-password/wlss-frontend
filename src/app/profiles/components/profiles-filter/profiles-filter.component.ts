import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseFormComponent } from '@core/base-components';
import { InputComponent } from '@core/components/input';
import { DisableRepeatWhitespacesDirective, TrimStartWhitespacesDirective } from '@core/directives';
import { IProfilesFilter, IProfilesFilterFormGroup } from '@profiles/models';

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
export class ProfilesFilterComponent extends BaseFormComponent<IProfilesFilterFormGroup> implements OnInit {
  @Output() change = new EventEmitter<IProfilesFilter>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initProfilesFilterForm();
    this.subscribeOnProfilesFilterFormChanges();
  }

  private initProfilesFilterForm(): void {
    this.form = this.fb.group<IProfilesFilterFormGroup>({
      login: this.fb.control<string>('', { nonNullable: true }),
      name: this.fb.control<string>('', { nonNullable: true }),
    });
  }

  private subscribeOnProfilesFilterFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const filter = this.form.value as IProfilesFilter;
      const lowerCaseFilter: IProfilesFilter = {
        login: filter.login.toLowerCase(),
        name: filter.name.toLowerCase(),
      };
      this.change.emit(lowerCaseFilter);
    });
  }
}
