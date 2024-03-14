import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true,
})
export class DragAndDropDirective implements AfterViewInit {
  @Output() dropFile: EventEmitter<File> = new EventEmitter();

  constructor(private dragAndDropArea: ElementRef) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAndDropArea.nativeElement.style.backgroundColor = 'var(--accent)';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAndDropArea.nativeElement.style.backgroundColor = 'var(--text-2)';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAndDropArea.nativeElement.style.backgroundColor = 'var(--text-2)';
    if (!event.dataTransfer) {
      return;
    }
    const file = event.dataTransfer.files[0];
    this.dropFile.emit(file);
  }

  ngAfterViewInit(): void {
    this.dragAndDropArea.nativeElement.style.backgroundColor = 'var(--text-2)';
  }
}
