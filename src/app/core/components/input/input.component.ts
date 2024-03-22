import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BaseInputComponent } from '@core/base-components';
import { ErrorComponent } from '@core/components/error';

const imports = [ErrorComponent, FormsModule, MatFormFieldModule, MatInputModule, NgClass, NgIf, ReactiveFormsModule];
@Component({
  imports,
  selector: 'app-input',
  standalone: true,
  styleUrl: 'input.component.scss',
  templateUrl: 'input.component.html',
})
export class InputComponent extends BaseInputComponent { }
