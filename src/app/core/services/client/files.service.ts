import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { TUploadFileResponse } from '@core/models/api';
import { FilesApiService } from '@core/services/api';

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private readonly filesApiService: FilesApiService) { }

  uploadFile(file: Blob): Observable<string> {
    const extension = file.type.split('/')[1];
    const formData = new FormData();
    formData.append('file', file, `file.${extension}`);
    return this.filesApiService.uploadFile(formData).pipe(
      switchMap((file: TUploadFileResponse) => of(file.id)),
    );
  }
}
