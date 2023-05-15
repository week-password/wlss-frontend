import { TemplateRef } from '@angular/core';

export interface IDIalogData {
  cancelButtonText?: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: TemplateRef<any>;
}
