import { TemplateRef } from '@angular/core';

import { EBaseColor } from './BaseColor';

export interface IDialogData {
  buttonsTemplate?: TemplateRef<HTMLElement>;
  cancelButtonText?: string;
  content?: string;
  contentTemplate?: TemplateRef<HTMLElement>;
  customCloseFunction?: () => void;
  submitButtonColor?: EBaseColor;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: TemplateRef<HTMLElement>;
}
