import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { BehaviorSubject, takeUntil } from 'rxjs';

import { BaseComponent } from '@core/base-components';
import { IconComponent } from '@core/components/icon';
import { SnackbarComponent } from '@core/components/snackbar';
import { DragAndDropDirective } from '@core/directives';
import { EHttpError } from '@core/models/api';
import {
  EFileError,
  EMatSnackbarHPosition,
  EMatSnackbarVPosition,
  EPosition,
  ESnackbarView,
  ETextPosition,
  TSnackbarData,
} from '@core/models/client';
import { FileSizePipe } from '@core/pipes';
import { FilesService } from '@core/services/client';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: true,
  imports: [DragAndDropDirective, IconComponent, ImageCropperModule, NgIf],
})
export class ImageUploaderComponent extends BaseComponent implements OnInit {
  @Input() maxFileSize: number | null = null;
  @Input() removeOriginDisabled: boolean;

  @Output() change = new EventEmitter<void>();
  @Output() upload = new EventEmitter<string>();
  @Output() removeOrigin = new EventEmitter<void>();

  @ViewChild('cropper') readonly cropper: ImageCropperComponent;

  minScale: number;
  scale: number;
  rotation = 0;
  transform: ImageTransform = { translateUnit: 'px' };
  imageUrl: string | undefined;
  imageChangedEvent: Event | null;
  isLoaded = false;

  private fileError$ = new BehaviorSubject<EFileError | null>(null);
  private fileSizePipe = new FileSizePipe();

  constructor(private filesService: FilesService, private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnFileError();
  }

  onDropped(file: File): void {
    const fileError = this.validateFile(file);
    this.fileError$.next(fileError);
    if (fileError !== null) {
      return;
    }
    this.triggerDroppedImageLoading(file);
  }

  onFileChanged(fileChangedEvent: Event): void {
    const target = fileChangedEvent.target as HTMLInputElement;
    if (!target.files?.length) {
      this.fileError$.next(EFileError.other);
      return;
    }
    const fileError = this.validateFile(target.files[0]);
    this.fileError$.next(fileError);
    if (fileError !== null) {
      return;
    }
    this.triggerSelectedImageLoading(fileChangedEvent);
  }

  onLoaded(file: LoadedImage): void {
    this.isLoaded = true;
    this.fitToScreen(file.original.size);
    this.change.emit();
  }

  onError(): void {
    if (this.fileError$.value) {
      return;
    }
    this.fileError$.next(EFileError.other);
  }

  triggerUploading(): void {
    this.cropper.crop();
  }

  onCropped(file: ImageCroppedEvent): void {
    if (!file.blob) {
      this.fileError$.next(EFileError.other);
      return;
    }
    this.uploadFile(file.blob);
  }

  remove(): void {
    if (!this.isLoaded) {
      this.removeOrigin.emit();
      this.change.emit();
      return;
    }
    this.imageChangedEvent = null;
    this.imageUrl = undefined;
    this.isLoaded = false;
    this.transform = { translateUnit: 'px' };
    this.rotation = 0;
    this.change.emit();
  }

  rotate(): void {
    this.rotation--;
  }

  zoom(event: WheelEvent): void {
    if (!this.isLoaded) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (event.deltaY < 0) { // прокрутка вверх
      this.zoomIn();
    }
    if (event.deltaY > 0) { // прокрутка вниз
      this.zoomOut();
    }
    this.updateScale();
  }

  private zoomOut(): void {
    if (this.scale <= this.minScale) {
      return;
    }
    this.scale -= 0.1;
  }

  private zoomIn(): void {
    this.scale += 0.1;
  }

  private updateScale(): void {
    this.transform = { ...this.transform, scale: this.scale };
  }

  private fitToScreen(size: { width: number, height: number }): void {
    const { width, height } = size;

    const scale = width > height ? width / height : height / width;
    this.minScale = scale;
    this.scale = scale;
    this.updateScale();
  }

  private validateFile(file: File | null): EFileError | null {
    if (!file) {
      return EFileError.other;
    }
    const fileFormatRegexp = /image\/*/;
    if (!fileFormatRegexp.test(file.type)) {
      return EFileError.format;
    }
    if (this.maxFileSize && file.size > this.maxFileSize) {
      return EFileError.size;
    }
    return null;
  }

  private subscribeOnFileError(): void {
    this.fileError$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((fileError: EFileError | null) => {
      if (!fileError) {
        return;
      }
      const data: TSnackbarData = {
        width: 260,
        catPosition: EPosition.top,
        textAlign: ETextPosition.right,
        view: ESnackbarView.error,
        text: 'Произошла непредвиденная ошибка при загрузке файла',
      };
      if (fileError === EFileError.format) {
        data.text = 'Недопустимый формат файла';
      }
      if (this.maxFileSize && fileError === EFileError.size) {
        data.text = `Размер файла не должен быть более ${this.fileSizePipe.transform(this.maxFileSize)}`;
      }
      this.snackBar.openFromComponent(SnackbarComponent, {
        data,
        horizontalPosition: EMatSnackbarHPosition.end,
        verticalPosition: EMatSnackbarVPosition.top,
        duration: 5000,
      });
    });
  }

  private triggerDroppedImageLoading(file: File): void {
    const url = window.URL.createObjectURL(file);
    this.imageUrl = url;
  }

  private triggerSelectedImageLoading(imageChangedEvent: Event): void {
    this.imageChangedEvent = imageChangedEvent;
  }

  private uploadFile(file: Blob): void {
    this.filesService.uploadFile(file).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (fileId: string) => {
        this.upload.emit(fileId);
        this.change.emit();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === EHttpError.unprocessableEntity) {
          this.fileError$.next(EFileError.format);
          return;
        }
        if (error.status === EHttpError.requestEntityTooLarge) {
          this.fileError$.next(EFileError.size);
          return;
        }
        this.fileError$.next(EFileError.other);
      },
    });
  }
}
