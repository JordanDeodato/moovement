import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/fitquest.models';

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between p-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors group">
      <div class="flex items-center gap-md">
        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20" [class]="getIconClass()">
          <span class="material-symbols-outlined">{{ getIcon() }}</span>
        </div>
        <div>
          <div class="flex items-center gap-sm">
            <h4 class="font-h3 text-body-lg font-bold">{{ exercise.name }}</h4>
            <span *ngIf="exercise.intensity" class="px-xs py-[2px] bg-secondary-container/30 text-on-secondary-container text-[8px] font-bold rounded uppercase tracking-tighter border border-secondary-container/50">
              {{ exercise.intensity }}
            </span>
          </div>
          <p class="text-on-surface-variant text-sm">{{ exercise.sets }} x {{ exercise.reps }} · {{ exercise.muscle }}</p>
        </div>
      </div>
      <span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_vert</span>
    </div>
  `,
  styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `]
})
export class ExerciseItemComponent {
  @Input() exercise!: Exercise;

  getIcon(): string {
    // Map muscle to icon
    const muscleIcons: Record<string, string> = {
      'Peito': 'fitness_center',
      'Tríceps': 'fitness_center',
      'Peito/Tríceps': 'accessibility_new'
    };
    return muscleIcons[this.exercise.muscle] || 'exercise';
  }

  getIconClass(): string {
    return this.exercise.intensity ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-variant/30 text-on-surface-variant';
  }
}