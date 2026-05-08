import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievement-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high text-3xl shadow-[0_0_18px_rgba(255,255,255,0.08)]">
        <span>{{ icon }}</span>
      </div>
      <div class="text-center space-y-2">
        <p class="text-sm font-semibold text-white">{{ title }}</p>
        <span [class]="badgeClass">{{ unlocked ? 'DESBLOQUEADO' : 'BLOQUEADO' }}</span>
      </div>
    </div>
  `
})
export class AchievementBadgeComponent {
  @Input() title = '';
  @Input() icon = '⭐';
  @Input() unlocked = false;
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'surface' = 'primary';

  get containerClass(): string {
    const glow = this.unlocked ? 'shadow-[0_0_20px_rgba(196,192,255,0.22)]' : 'opacity-60 grayscale';
    return [`glass-card`, `flex`, `flex-col`, `items-center`, `gap-3`, `rounded-3xl`, `border`, `border-white/10`, `px-4`, `py-5`, glow].join(' ');
  }

  get badgeClass(): string {
    if (this.unlocked) {
      return 'inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest';
    }
    return 'inline-block px-2 py-1 rounded-full bg-on-surface-variant/20 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest';
  }
}
