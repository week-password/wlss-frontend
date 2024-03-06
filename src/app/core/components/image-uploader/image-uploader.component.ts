import { ImgCropperConfig, ImgCropperError, ImgCropperErrorEvent, ImgCropperEvent, LyImageCropper, LyImageCropperModule } from '@alyle/ui/image-cropper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { IconComponent } from '@core/components/icon';
import { SnackbarComponent } from '@core/components/snackbar';
import { DragAndDropStyleDirective } from '@core/directives';
import {
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  ISnackbarData,
} from '@core/models';
import { UiStateService } from '@root/services/state';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: true,
  imports: [DragAndDropStyleDirective, IconComponent, LyImageCropperModule],
})
export class ImageUploaderComponent extends BaseComponent implements OnInit {
  @Input() maxFileSize: number | null = null;
  @Input() removeOriginImageDisabled: boolean;
  @Output() change = new EventEmitter<ImgCropperEvent | null>();
  @Output() removeOriginImage = new EventEmitter<void>();
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;

  croppedImage?: string;
  imageCropperConfig: ImgCropperConfig;
  maxScale: number;
  minScale: number;
  scale: number;

  constructor(private snackBar: MatSnackBar, private uiStateService: UiStateService) {
    super();
  }

  ngOnInit(): void {
    this.imageCropperConfig = {
      width: 320,
      height: 320,
      type: 'image/*',
      round: true,
      maxFileSize: this.maxFileSize,
    };
    this.subscribeOnWindowWidthChanges();
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

  private subscribeOnWindowWidthChanges(): void {
    this.uiStateService.mobile.pipe(
      takeUntil(this.destroy$),
    ).subscribe((mobile: boolean) => {
      this.cropper.clean();
      this.imageCropperConfig = {
        ...this.imageCropperConfig,
        width: mobile ? 280 : 320,
        height: mobile ? 280 : 320,
      };
    });
  }
}
