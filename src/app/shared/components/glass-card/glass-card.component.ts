import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="containerClass">
      <ng-content></ng-content>
    </section>
  `
})
export class GlassCardComponent {
  @Input() padding = 'p-5';
  @Input() rounded = 'rounded-3xl';
  @Input() glow = false;
  @Input() clickable = false;

  get containerClass(): string {
    return [
      'glass-card',
      this.padding,
      this.rounded,
      this.glow ? 'shadow-[0_0_30px_rgba(196,192,255,0.18)]' : 'shadow-sm',
      this.clickable ? 'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-white/20' : ''
    ].join(' ');
  }
}
