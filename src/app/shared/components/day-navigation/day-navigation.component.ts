import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-navigation',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col items-center gap-md">
      <div class="flex items-center justify-between w-full max-w-md px-lg">
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant/30 hover:bg-surface-variant transition-colors" (click)="previousDay()">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <div class="text-center">
          <h2 class="font-h3 text-h3 text-on-surface">{{ currentDayLabel }}</h2>
        </div>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant/30 hover:bg-surface-variant transition-colors" (click)="nextDay()">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <!-- Navigation Dots -->
      <div class="flex items-center gap-sm">
        <div class="w-2 h-2 rounded-full" [class]="getDotClass(0)"></div>
        <div class="w-3 h-3 rounded-full" [class]="getDotClass(1)"></div>
        <div class="w-2 h-2 rounded-full" [class]="getDotClass(2)"></div>
      </div>
    </section>
  `,
  styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `]
})
export class DayNavigationComponent {
  @Input() currentDayIndex = 1; // 0: ontem, 1: hoje, 2: amanhã
  @Input() currentDayLabel = 'Hoje · 11 abr, Qui';
  @Output() dayChanged = new EventEmitter<number>();

  previousDay(): void {
    if (this.currentDayIndex > 0) {
      this.dayChanged.emit(this.currentDayIndex - 1);
    }
  }

  nextDay(): void {
    if (this.currentDayIndex < 2) {
      this.dayChanged.emit(this.currentDayIndex + 1);
    }
  }

  getDotClass(index: number): string {
    return index === this.currentDayIndex
      ? 'bg-primary shadow-[0_0_10px_rgba(196,192,255,0.5)]'
      : 'bg-outline-variant';
  }
}