import { TemplateRef } from '@angular/core';
import { EPosition, ETextPosition } from '.';

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
  textTemplate?: TemplateRef<any>;
  title?: string;
  titleTemplate?: TemplateRef<any>;
  view: ESnackbarView;
  width?: number;
}
