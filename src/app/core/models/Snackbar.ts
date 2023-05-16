import { CustomTemplateRef, EPosition, ETextPosition } from '.';

export enum EMatSnackbarHPosition {
  center = 'center',
  end = 'end',
  left = 'left',
  right = 'right',
  start = 'start',
}
export enum EMatSnackbarVPosition {
  bottom = 'bottom',
  top = 'top',
}
export enum ESnackbarView {
  error = 'error',
  info = 'info',
}
export interface ISnackbarData {
  buttonText?: string;
  catPosition?: EPosition;
  text?: string;
  textAlign?: ETextPosition;
  textTemplate?: CustomTemplateRef;
  title?: string;
  titleTemplate?: CustomTemplateRef;
  view: ESnackbarView;
  width?: number;
}
