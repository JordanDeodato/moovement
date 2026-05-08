import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../../shared/components/topbar/topbar.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { WeekCalendarComponent } from '../../../shared/components/week-calendar/week-calendar.component';
import { StatsCardComponent } from '../../../shared/components/stats-card/stats-card.component';
import { WorkoutMissionCardComponent } from '../../../shared/components/workout-mission-card/workout-mission-card.component';
import { AchievementBadgeComponent } from '../../../shared/components/achievement-badge/achievement-badge.component';
import { BottomNavbarComponent } from '../../../shared/components/bottom-navbar/bottom-navbar.component';
import { FloatingActionButtonComponent } from '../../../shared/components/floating-action-button/floating-action-button.component';
import { HomeService } from '../services/home.service';
import { Achievement } from '../../../shared/models/achievement.model';
import { Workout } from '../../../shared/models/workout.model';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    GlassCardComponent,
    ProgressBarComponent,
    WeekCalendarComponent,
    StatsCardComponent,
    WorkoutMissionCardComponent,
    AchievementBadgeComponent,
    BottomNavbarComponent,
    FloatingActionButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-on-background font-sans">
      <app-topbar [streak]="user().streak"></app-topbar>

      <main class="mx-auto max-w-6xl px-4 pt-28 pb-36 sm:px-6 lg:px-8">
        <section class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold text-white sm:text-4xl">Bom dia, {{ user().name }}! 👋</h1>
            <p class="text-sm uppercase tracking-[0.28em] text-on-surface-variant">Nível {{ user().level }} · Guerreiro</p>
          </div>
          <div class="rounded-3xl bg-surface-container/80 px-5 py-4 text-right text-on-surface-variant shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            <div class="inline-flex items-center gap-2 text-lg font-semibold text-tertiary">
              <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
              <span>{{ user().streak }} dias</span>
            </div>
          </div>
        </section>

        <section class="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <app-glass-card class="space-y-6" [padding]="'p-6'" [rounded]="'rounded-[2rem]'" [glow]="true">
            <div class="flex items-end justify-between gap-4">
              <div>
                <span class="text-xs uppercase tracking-[0.28em] text-primary">Próximo nível</span>
                <p class="mt-2 text-3xl font-bold text-white">{{ progressPercent() }}%</p>
              </div>
              <div class="text-right text-on-surface-variant">
                <p class="text-sm font-semibold">{{ user().xp }} / {{ user().nextLevelXp }} XP</p>
              </div>
            </div>
            <app-progress-bar
              [value]="user().xp"
              [max]="user().nextLevelXp"
              label="Barra de XP"
              colorVariant="primary"
            ></app-progress-bar>
          </app-glass-card>

          <app-week-calendar
            [weekDays]="weekDays()"
            [activeDay]="activeDay()"
            [completedDays]="completedDays()"
          ></app-week-calendar>
        </section>

        <section class="grid gap-6 py-6 lg:grid-cols-3">
          <ng-container *ngFor="let stat of stats(); trackBy: trackByStat">
            <app-stats-card
              [icon]="stat.icon"
              [value]="stat.value"
              [label]="stat.label"
              [color]="stat.color"
            ></app-stats-card>
          </ng-container>
        </section>

        <section class="space-y-6">
          <app-workout-mission-card
            [workout]="workout()"
            (startWorkout)="onStartWorkout($event)"
          ></app-workout-mission-card>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-sm uppercase tracking-[0.28em] text-on-surface-variant">Conquistas recentes</h2>
              <span class="text-sm font-semibold text-primary">Ver tudo</span>
            </div>
            <div class="flex gap-4 overflow-x-auto pb-2">
              <ng-container *ngFor="let badge of achievements(); trackBy: trackByAchievement">
                <app-achievement-badge
                  [title]="badge.title"
                  [icon]="badge.icon"
                  [unlocked]="badge.unlocked"
                  [variant]="badge.unlocked ? 'primary' : 'surface'"
                ></app-achievement-badge>
              </ng-container>
            </div>
          </div>
        </section>
      </main>

      <app-bottom-navbar></app-bottom-navbar>
      <app-floating-action-button
        ariaLabel="Adicionar atividade"
        (action)="onFabClick()">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">add</span>
        <span class="tracking-wider">ADICIONAR</span>
      </app-floating-action-button>
    </div>
  `
})
export class HomeComponent {
  readonly user = signal<User>({} as User);
  readonly workout = signal<Workout>({} as Workout);
  readonly achievements = signal<Achievement[]>([]);
  readonly weekDays = signal<{ id: string; label: string; completed: boolean }[]>([]);
  readonly activeDay = signal('');
  readonly completedDays = signal<string[]>([]);
  readonly stats = signal<{ icon: string; value: string; label: string; color: 'primary' | 'secondary' | 'tertiary' }[]>([]);

  readonly progressPercent = computed(() => {
    const current = this.user();
    return current.nextLevelXp ? Math.round((current.xp / current.nextLevelXp) * 100) : 0;
  });

  constructor(private readonly homeService: HomeService) {
    this.user.set(this.homeService.getUser());
    this.workout.set(this.homeService.getCurrentWorkout());
    this.achievements.set(this.homeService.getAchievements());
    const weekly = this.homeService.getWeeklyProgress();
    this.weekDays.set(weekly.weekDays);
    this.activeDay.set(weekly.activeDay);
    this.completedDays.set(weekly.completedDays);
    const stats = this.homeService.getStats();
    this.stats.set([
      { icon: 'heart', value: `${stats.workouts}`, label: 'treinos', color: 'secondary' },
      { icon: 'clock', value: stats.duration, label: 'tempo', color: 'tertiary' },
      { icon: 'zap', value: `${stats.xpTotal}`, label: 'XP totais', color: 'primary' }
    ]);
  }

  trackByStat(_: number, stat: { label: string }): string {
    return stat.label;
  }

  trackByAchievement(_: number, achievement: Achievement): string {
    return achievement.id;
  }

  onStartWorkout(workoutId: string): void {
    console.log('Iniciando treino', workoutId);
  }

  onFabClick(): void {
    console.log('FAB acionado');
  }
}
