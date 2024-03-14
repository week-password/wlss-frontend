import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} Б`;
    }
    const kbytes = Math.round(bytes * 100 / 1024) / 100;
    if (kbytes < 1024) {
      return `${kbytes} КБ`;
    }
    const mbytes = Math.round(kbytes * 100 / 1024) / 100;
    if (mbytes < 1024) {
      return `${mbytes} МБ`;
    }
    const gbytes = Math.round(mbytes * 100 / 1024) / 100;
    if (gbytes < 1024) {
      return `${gbytes} ГБ`;
    }
    return `${bytes} Б`;
  }
}
