import { ChangeDetectionStrategy, Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { progressColorClasses } from '../../ui/design-tokens';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3">
      <div class="flex items-center justify-between text-sm font-semibold text-on-surface-variant">
        <span>{{ label }}</span>
        <span>{{ value }} / {{ max }} XP</span>
      </div>
      <div class="h-3 w-full rounded-full overflow-hidden bg-surface-container-highest border border-white/10 p-0.5">
        <div [style.width.%]="percent()" [class]="barClasses()" class="h-full rounded-full transition-all duration-500"></div>
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label = 'Progresso';
  @Input() colorVariant: keyof typeof progressColorClasses = 'primary';

  readonly percent = computed(() => {
    return this.max ? Math.round((this.value / this.max) * 100) : 0;
  });

  readonly barClasses = computed(() => {
    return progressColorClasses[this.colorVariant];
  });
}
