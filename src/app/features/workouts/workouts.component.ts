import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { BottomNavbarComponent } from '../../shared/components/bottom-navbar/bottom-navbar.component';
import { FloatingActionButtonComponent } from '../../shared/components/floating-action-button/floating-action-button.component';
import { DayNavigationComponent } from '../../shared/components/day-navigation/day-navigation.component';
import { WorkoutDetailCardComponent } from '../../shared/components/workout-detail-card/workout-detail-card.component';
import { MoovementDataService } from '../../shared/services/moovement-data.service';
import { Workout } from '../../shared/models/moovement.models';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    BottomNavbarComponent,
    FloatingActionButtonComponent,
    DayNavigationComponent,
    WorkoutDetailCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-on-surface font-body-md pb-32">
      <app-topbar [streak]="user().streak"></app-topbar>

      <main class="pt-24 px-lg">
        <div class="mx-auto max-w-6xl space-y-xl">
          <app-day-navigation
            [currentDayIndex]="currentDayIndex()"
            [currentDayLabel]="currentDayLabel()"
            (dayChanged)="onDayChanged($event)">
          </app-day-navigation>

          <div class="grid gap-xl lg:grid-cols-[1fr_0.24fr] items-start">
            <div class="space-y-xl">
              <app-workout-detail-card
                [workout]="workout()"
                (startWorkout)="onStartWorkout($event)">
              </app-workout-detail-card>
            </div>

            <div class="hidden lg:flex flex-col gap-md">
              <div class="glass-card rounded-3xl p-lg h-full opacity-30 pointer-events-none"></div>
              <div class="glass-card rounded-3xl p-lg h-32 opacity-30 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </main>

      <app-floating-action-button
        ariaLabel="Iniciar Treino"
        (action)="onStartWorkout(workout().id)">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        <span class="tracking-wider">INICIAR TREINO</span>
      </app-floating-action-button>

      <app-bottom-navbar></app-bottom-navbar>
    </div>
  `,
  styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `]
})
export class WorkoutsComponent {
  readonly user = signal({} as any);
  readonly workout = signal({} as Workout);
  readonly currentDayIndex = signal(1); // hoje
  readonly currentDayLabel = signal('Hoje · 11 abr, Qui');

  constructor(private readonly dataService: MoovementDataService) {
    this.user.set(this.dataService.getUser());
    this.workout.set(this.dataService.getCurrentWorkout());
  }

  onDayChanged(index: number): void {
    this.currentDayIndex.set(index);
    // Update label based on index
    const labels = ['Ontem · 10 abr, Qua', 'Hoje · 11 abr, Qui', 'Amanhã · 12 abr, Sex'];
    this.currentDayLabel.set(labels[index]);
  }

  onStartWorkout(workoutId: string): void {
    console.log('Starting workout:', workoutId);
    // Navigate to workout execution or something
  }
}
