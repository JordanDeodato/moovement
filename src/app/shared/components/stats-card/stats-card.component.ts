import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-surface-container/70 p-5 text-center shadow-[0_0_18px_rgba(0,0,0,0.18)]">
      <div [class]="iconWrapperClass">
        <svg [innerHTML]="getIconSvg()" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"></svg>
      </div>
      <div class="space-y-1">
        <p class="text-2xl font-bold text-white">{{ value }}</p>
        <p class="text-[11px] uppercase tracking-[0.25em] text-on-surface-variant">{{ label }}</p>
      </div>
    </article>
  `
})
export class StatsCardComponent {
  @Input() icon = 'zap';
  @Input() value = '';
  @Input() label = '';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';

  readonly colorMap: Record<'primary' | 'secondary' | 'tertiary', string> = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary'
  };

  readonly iconSvgs: Record<string, string> = {
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  };

  constructor(private sanitizer: DomSanitizer) {}

  get iconWrapperClass(): string {
    return `${this.colorMap[this.color]} flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10`;
  }

  getIconSvg(): SafeHtml {
    const svg = this.iconSvgs[this.icon] || this.iconSvgs['zap'];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
