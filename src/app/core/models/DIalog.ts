import { CustomTemplateRef } from '.';

export interface IDialogData {
  cancelButtonText?: string;
  content?: string;
  contentTemplate?: CustomTemplateRef;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: CustomTemplateRef;
}
