import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-mission-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-hidden rounded-3xl bg-white/5 border-2 border-white/10 backdrop-blur-xl p-6 shadow-[0_0_32px_rgba(108,99,255,0.18)]">
      <div class="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-500"></div>

      <div class="relative z-10 space-y-6">
        <div>
          <span class="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            RECOMENDADO
          </span>

          <h3 class="text-2xl font-bold text-white mb-3">
            {{ workout.title }}
          </h3>

          <div class="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm">

            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-base">
                fitness_center
              </span>
              {{ workout.exercises }} exs
            </span>

            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-base">
                schedule
              </span>
              {{ workout.duration }}
            </span>

          </div>
        </div>

        <div class="flex items-center justify-between border-t border-white/10 pt-6">

          <div class="flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined">
              stars
            </span>

            <span class="text-lg font-bold">
              +{{ workout.xpReward }} XP
            </span>
          </div>

          <button
            type="button"
            (click)="onStart()"
            class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-[0_8px_32px_rgba(108,99,255,0.4)] hover:shadow-[0_12px_48px_rgba(108,99,255,0.6)] active:scale-95 transition-all"
          >
            INICIAR

            <span class="material-symbols-outlined">
              play_arrow
            </span>
          </button>

        </div>
      </div>
    </div>
  `
})
export class WorkoutMissionCardComponent {
  @Input() workout!: Workout;
  @Output() startWorkout = new EventEmitter<string>();

  onStart(): void {
    this.startWorkout.emit(this.workout.id);
  }
}