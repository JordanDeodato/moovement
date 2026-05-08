import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-md pb-lg pt-md bg-surface-container/90 dark:bg-surface-container/90 backdrop-blur-2xl border-t border-white/5 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] rounded-t-xl">
      <a class="flex flex-col items-center justify-center gap-xs rounded-xl px-4 py-1 transition-all text-on-surface-variant opacity-60 hover:text-primary hover:opacity-100"
         routerLink="/" routerLinkActive="text-primary bg-primary/10 shadow-[0_0_15px_rgba(196,192,255,0.3)]" [routerLinkActiveOptions]="{ exact: true }">
        <span class="material-symbols-outlined">home</span>
        <span class="font-label-caps text-label-caps mt-1">Home</span>
      </a>
      <a class="flex flex-col items-center justify-center gap-xs rounded-xl px-4 py-1 transition-all text-on-surface-variant opacity-60 hover:text-primary hover:opacity-100"
         routerLink="/workouts" routerLinkActive="text-primary bg-primary/10 shadow-[0_0_15px_rgba(196,192,255,0.3)]">
        <span class="material-symbols-outlined">fitness_center</span>
        <span class="font-label-caps text-label-caps mt-1">Workouts</span>
      </a>
      <a class="flex flex-col items-center justify-center gap-xs rounded-xl px-4 py-1 transition-all text-on-surface-variant opacity-60 hover:text-primary hover:opacity-100"
         routerLink="/progress" routerLinkActive="text-primary bg-primary/10 shadow-[0_0_15px_rgba(196,192,255,0.3)]">
        <span class="material-symbols-outlined">query_stats</span>
        <span class="font-label-caps text-label-caps mt-1">Progress</span>
      </a>
      <a class="flex flex-col items-center justify-center gap-xs rounded-xl px-4 py-1 transition-all text-on-surface-variant opacity-60 hover:text-primary hover:opacity-100"
         routerLink="/profile" routerLinkActive="text-primary bg-primary/10 shadow-[0_0_15px_rgba(196,192,255,0.3)]">
        <span class="material-symbols-outlined">person</span>
        <span class="font-label-caps text-label-caps mt-1">Profile</span>
      </a>
    </nav>
  `,
  styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `]
})
export class BottomNavbarComponent {}
