import { Component } from '@angular/core';

import { BaseInputComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseInputComponent { }
