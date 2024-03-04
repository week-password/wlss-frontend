import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BaseInputComponent } from '@core/base-components';
import { ErrorComponent } from '@core/components/error';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [
    ErrorComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class TextareaComponent extends BaseInputComponent {
  @Input() cols = 50;
  @Input() rows = 4;
}
