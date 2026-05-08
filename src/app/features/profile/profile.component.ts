import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { BottomNavbarComponent } from '../../shared/components/bottom-navbar/bottom-navbar.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { AchievementBadgeComponent } from '../../shared/components/achievement-badge/achievement-badge.component';
import { MoovementDataService } from '../../shared/services/moovement-data.service';
import { Achievement, User } from '../../shared/models/moovement.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TopbarComponent, BottomNavbarComponent, ProgressBarComponent, AchievementBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-on-background font-body-md pb-32">
      <app-topbar [streak]="user().streak"></app-topbar>

      <main class="max-w-7xl mx-auto px-lg pt-24 space-y-xl">
        <section class="glass-card rounded-3xl p-lg">
          <div class="flex flex-col gap-md lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-3">
              <p class="font-label-caps text-label-caps uppercase tracking-[0.18em] text-tertiary">Perfil</p>
              <h1 class="font-h2 text-h2 text-on-surface">Olá, {{ user().name }}</h1>
              <p class="text-on-surface-variant font-body-md">Sua base de treinamento, conquistas e progresso estão reunidos aqui para facilitar sua jornada.</p>
            </div>
            <button class="inline-flex items-center gap-xs rounded-full border border-white/10 bg-surface-container-high px-md py-xs text-sm font-semibold text-primary hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined">edit</span>
              Editar perfil
            </button>
          </div>
        </section>

        <div class="grid gap-md xl:grid-cols-[2fr_1fr]">
          <section class="glass-card rounded-3xl p-lg space-y-lg">
            <div class="grid gap-md lg:grid-cols-[1fr_1.5fr] items-center">
              <div class="rounded-3xl bg-primary/10 p-lg text-center">
                <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/20 text-4xl font-bold text-primary">{{ user().name.charAt(0) }}</div>
                <p class="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-on-surface-variant">Nível atual</p>
                <p class="mt-2 text-h3 font-h3 text-primary">{{ user().level }}</p>
              </div>
              <div class="space-y-md">
                <div class="flex items-center justify-between gap-md rounded-3xl bg-surface-container-high p-md">
                  <div>
                    <p class="text-sm text-on-surface-variant uppercase tracking-[0.18em]">XP atual</p>
                    <p class="mt-2 text-lg font-semibold text-white">{{ user().xp }} / {{ user().nextLevelXp }}</p>
                  </div>
                  <span class="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Streak {{ user().streak }}d</span>
                </div>
                <app-progress-bar label="Progresso até o próximo nível" [value]="user().xp" [max]="user().nextLevelXp" colorVariant="primary"></app-progress-bar>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-md">
              <div class="rounded-3xl bg-surface-container-high p-md text-center">
                <p class="text-sm text-on-surface-variant uppercase tracking-[0.18em]">Treinos</p>
                <p class="mt-3 text-h3 font-h3 text-primary">{{ stats().workouts }}</p>
              </div>
              <div class="rounded-3xl bg-surface-container-high p-md text-center">
                <p class="text-sm text-on-surface-variant uppercase tracking-[0.18em]">XP total</p>
                <p class="mt-3 text-h3 font-h3 text-tertiary">{{ stats().xpTotal }}</p>
              </div>
            </div>
          </section>

          <section class="glass-card rounded-3xl p-lg">
            <div class="flex items-center justify-between mb-md">
              <div>
                <p class="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant">Conquistas</p>
                <p class="text-sm text-on-surface-variant">Os emblemas que você já desbloqueou</p>
              </div>
              <span class="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">Rank Bronze</span>
            </div>
            <div class="grid grid-cols-2 gap-md">
              <app-achievement-badge *ngFor="let achievement of achievements()" [title]="achievement.title" [icon]="achievement.icon" [unlocked]="achievement.unlocked"></app-achievement-badge>
            </div>
          </section>
        </div>
      </main>

      <app-bottom-navbar></app-bottom-navbar>
    </div>
  `
})
export class ProfileComponent {
  private readonly dataService = inject(MoovementDataService);

  readonly user = signal<User>({} as User);
  readonly stats = signal({ workouts: 0, duration: '0h 0m', xpTotal: 0 });
  readonly achievements = signal<Achievement[]>([]);

  constructor() {
    this.user.set(this.dataService.getUser());
    this.stats.set(this.dataService.getStats());
    this.achievements.set(this.dataService.getAchievements());
  }
}

