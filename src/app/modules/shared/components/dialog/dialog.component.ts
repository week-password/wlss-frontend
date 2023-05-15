import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { EBaseColor, IDIalogData } from 'src/app/core/models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  EBaseColor = EBaseColor;
  xmark = faXmark;

  cancelButtonText?: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: TemplateRef<any>;

  constructor(@Inject(MAT_DIALOG_DATA) data: IDIalogData) {
    this.cancelButtonText = data.cancelButtonText;
    this.content = data.content;
    this.contentTemplate = data.contentTemplate;
    this.submitButtonText = data.submitButtonText;
    this.title = data.title;
    this.titleTemplate = data.titleTemplate;
  }
}
