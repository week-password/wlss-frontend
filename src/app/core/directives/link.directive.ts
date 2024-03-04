import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLink]',
  standalone: true,
})
export class LinkDirective {
  @Input() appLink: string;
  @HostBinding('style.cursor') get cursor(): string { return 'pointer'; }

  private readonly mouseEventButton = {
    left: 0,
    middle: 1,
    right: 2,
  };

  @HostListener('click')
  onClick(): void {
    window.open(this.appLink, '_self');
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent): void {
    if (event.button === this.mouseEventButton.middle) {
      window.open(this.appLink, '_blanc');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    if (event.button === this.mouseEventButton.middle) {
      event.preventDefault();
    }
  }
}
