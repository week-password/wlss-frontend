import {
  ImgCropperConfig,
  ImgCropperError,
  ImgCropperErrorEvent,
  ImgCropperEvent,
  LyImageCropper,
} from '@alyle/ui/image-cropper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import {
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  ISnackbarData,
} from 'src/app/core/models';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Input() maxFileSize: number | null = null;
  @Input() removeOriginImageDisabled: boolean;
  @Output() change = new EventEmitter<ImgCropperEvent | null>();
  @Output() removeOriginImage = new EventEmitter<void>();
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;

  readonly arrowUpFromBracket = faArrowUpFromBracket;

  croppedImage?: string;
  imageCropperConfig: ImgCropperConfig;
  maxScale: number;
  minScale: number;
  scale: number;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.imageCropperConfig = {
      width: 320,
      height: 320,
      type: 'image/*',
      round: true,
      maxFileSize: this.maxFileSize,
    };
  }

  onCropped(file: ImgCropperEvent): void {
    this.croppedImage = file.dataURL;
    this.change.emit(file);
  }

  onLoaded(file: ImgCropperEvent): void {
    this.change.emit(file);
  }

  onError(file: ImgCropperErrorEvent): void {
    const data: ISnackbarData = {
      width: 260,
      catPosition: EPosition.top,
      textAlign: ETextPosition.right,
      view: ESnackbarView.error,
    };
    if (file.error === ImgCropperError.Size) {
      data.text = `Размер файла не должен быть более ${this.maxFileSize} Б`;
    }
    if (file.error === ImgCropperError.Type) {
      data.text = 'Недопустимый формат файла';
    }
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      horizontalPosition: EMatSnackbarHPosition.end,
      verticalPosition: EMatSnackbarVPosition.top,
      duration: 5000,
    });
  }

  removeImage(): void {
    if (!this.cropper.isLoaded) {
      this.removeOriginImage.emit();
    }
    this.cropper.clean();
    this.change.emit(null);
  }

  zoom(event: WheelEvent): void {
    if (!this.cropper.isLoaded) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (event.deltaY < 0) { // прокрутка вверх
      this.cropper.zoomIn();
    }
    if (event.deltaY > 0) { // прокрутка вниз
      this.cropper.zoomOut();
    }
  }
}
