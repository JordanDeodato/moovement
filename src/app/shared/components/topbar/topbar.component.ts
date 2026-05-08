import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(196,192,255,0.1)]">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-lg py-md">
        <div class="flex items-center gap-md">
          <span class="material-symbols-outlined text-primary text-h2">bolt</span>
          <h1 class="font-h2 text-h2 font-bold tracking-tighter text-primary">FITQUEST</h1>
        </div>
        <div class="flex items-center gap-xs bg-primary/10 px-md py-xs rounded-full border border-primary/20">
          <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          <span class="font-label-caps text-label-caps text-primary font-bold">{{ streak }}</span>
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent {
  @Input() streak = 0;
}
