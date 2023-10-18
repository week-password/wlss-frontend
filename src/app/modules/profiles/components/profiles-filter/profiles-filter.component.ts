import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';

import { IProfilesFilter, IProfilesFilterFormGroup } from 'src/app/modules/profiles/core/models';
import { BaseFormComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-profiles-filter',
  templateUrl: './profiles-filter.component.html',
  styleUrls: ['./profiles-filter.component.scss']
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
