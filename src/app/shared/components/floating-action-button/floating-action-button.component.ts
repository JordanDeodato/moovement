import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-action-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full px-lg max-w-md"
      [attr.aria-label]="ariaLabel"
      (click)="handleClick()"
    >
      <div class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-h3 py-md rounded-2xl flex items-center justify-center gap-md shadow-[0_8px_32px_rgba(196,192,255,0.4)] active:scale-95 transition-transform">
        <ng-content></ng-content>
      </div>
    </button>
  `
})
export class FloatingActionButtonComponent {
  @Input() ariaLabel = 'Ação principal';
  @Output() action = new EventEmitter<void>();

  handleClick(): void {
    this.action.emit();
  }
}
