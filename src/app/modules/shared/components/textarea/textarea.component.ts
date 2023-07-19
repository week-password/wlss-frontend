import { Component, Input } from '@angular/core';

import { BaseInputComponent } from 'src/app/modules/shared/directives';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends BaseInputComponent {
  @Input() cols = 50;
  @Input() rows = 4;
}
