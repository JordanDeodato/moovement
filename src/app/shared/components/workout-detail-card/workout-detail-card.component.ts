import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseItemComponent } from '../exercise-item/exercise-item.component';
import { Workout } from '../../models/moovement.models';

@Component({
    selector: 'app-workout-detail-card',
    standalone: true,
    imports: [CommonModule, ExerciseItemComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="glass-card rounded-2xl overflow-hidden shadow-2xl">
      <!-- Card Header -->
      <div class="relative h-48 flex flex-col justify-end p-lg overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img
                class="w-full h-full object-cover opacity-40"
                alt="Workout background"
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
            />
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        </div>
        <div class="relative z-10 space-y-xs">
          <div class="flex justify-between items-start">
            <h3 class="font-h2 text-h2 text-white leading-tight">{{ workout.title }}</h3>
            <div class="bg-tertiary-container/90 px-md py-xs rounded-lg backdrop-blur-md">
              <span class="font-label-caps text-label-caps text-white font-bold tracking-widest whitespace-nowrap">XP +{{ workout.xpReward }}</span>
            </div>
          </div>
          <div class="flex items-center gap-md text-on-surface-variant">
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">fitness_center</span>
              <span class="font-label-caps text-[10px]">{{ workout.muscles?.join(', ') }}</span>
            </div>
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">schedule</span>
              <span class="font-label-caps text-[10px]">{{ workout.duration }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Exercise List -->
      <div class="p-lg space-y-md">
        <ng-container *ngFor="let exercise of workout.exercisesList; trackBy: trackByExercise">
          <app-exercise-item [exercise]="exercise"></app-exercise-item>
        </ng-container>
      </div>
    </div>
  `,
    styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `]
})
export class WorkoutDetailCardComponent {
    @Input() workout!: Workout;
    @Output() startWorkout = new EventEmitter<string>();

    trackByExercise(index: number, exercise: any): string {
        return exercise.id;
    }
}