import { EBaseColor } from './BaseColor';
import { CustomTemplateRef } from './TemplateRef';

export interface IDialogData {
  buttonsTemplate?: CustomTemplateRef;
  cancelButtonText?: string;
  content?: string;
  contentTemplate?: CustomTemplateRef;
  customCloseFunction?: () => void;
  submitButtonColor?: EBaseColor;
  submitButtonText?: string;
  title?: string;
  titleTemplate?: CustomTemplateRef;
}
