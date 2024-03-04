import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDragAndDropStyle]',
  standalone: true,
})
export class DragAndDropStyleDirective implements AfterViewInit {
  @Input() dragAndDropArea: HTMLElement;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAndDropArea.style.backgroundColor = 'var(--accent)';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragAndDropArea.style.backgroundColor = 'var(--text-2)';
  }

  @HostListener('drop', ['$event'])
  onDrop(): void {
    this.dragAndDropArea.style.backgroundColor = 'var(--text-2)';
  }

  ngAfterViewInit(): void {
    this.dragAndDropArea.style.backgroundColor = 'var(--text-2)';
  }
}
