import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TUploadFileResponse } from '@core/models/api';
import { FilesApiService } from '@core/services/api';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private readonly maxFileNameLength = 256;

  constructor(private readonly filesApiService: FilesApiService) { }

  uploadFile(file: Blob, fileName: string): Observable<string> {
    const extension = file.type.split('/')[1];
    const fileFullName = `${fileName.slice(0, this.maxFileNameLength - extension.length)}.${extension}`;
    const formData = new FormData();
    formData.append('file', file, fileFullName);
    return this.filesApiService.uploadFile(formData).pipe(
      switchMap((file: TUploadFileResponse) => of(file.id)),
    );
  }
}
