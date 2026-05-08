import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeekDay {
  id: string;
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-week-calendar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4 rounded-3xl bg-surface-container/75 p-4 text-on-surface-variant shadow-[0_0_24px_rgba(0,0,0,0.18)]">
      <div class="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-primary">Esta semana <i class="pi pi-calendar"></i></div>
      <div class="grid grid-cols-7 gap-2">
        <ng-container *ngFor="let day of weekDays; trackBy: trackByDay">
          <div [class]="itemClass(day)">
            <span class="text-[10px] font-semibold uppercase tracking-[0.22em]">{{ day.label }}</span>
            <div class="mt-2 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-base">
              <span *ngIf="isCompleted(day)" class="material-symbols-outlined">
                check_circle
              </span>
              <span *ngIf="!isCompleted(day) && isActive(day)" class="material-symbols-outlined">
                bolt
              </span>
              <span *ngIf="!isCompleted(day) && !isActive(day)" class="text-on-surface-variant">•</span>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class WeekCalendarComponent {
  @Input() weekDays: WeekDay[] = [];
  @Input() activeDay = '';
  @Input() completedDays: string[] = [];

  isCompleted(day: WeekDay): boolean {
    return this.completedDays.includes(day.id);
  }

  isActive(day: WeekDay): boolean {
    return day.id === this.activeDay;
  }

  trackByDay(index: number, day: WeekDay): string {
    return day.id;
  }

  itemClass(day: WeekDay): string {
    const base = 'flex flex-col items-center justify-between rounded-3xl border p-3 transition duration-200';
    const active = this.isActive(day) ? 'border-primary/30 bg-primary/10 shadow-[0_0_20px_rgba(108,99,255,0.18)]' : 'border-white/10 bg-surface-container';
    const dimmed = this.isCompleted(day) ? 'opacity-100' : 'opacity-60';
    return `${base} ${active} ${dimmed}`;
  }
}
