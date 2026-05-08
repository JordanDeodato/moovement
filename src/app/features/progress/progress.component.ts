import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { BottomNavbarComponent } from '../../shared/components/bottom-navbar/bottom-navbar.component';
import { MoovementDataService } from '../../shared/services/fitquest-data.service';
import { User } from '../../shared/models/fitquest.models';

interface WeeklyBar {
  label: string;
  height: string;
  active?: boolean;
  accentClass?: string;
}

interface RecordItem {
  label: string;
  detail: string;
  delta: string;
  accent?: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, TopbarComponent, BottomNavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-on-background font-body-md pb-32">
      <app-topbar [streak]="user().streak"></app-topbar>

      <main class="max-w-7xl mx-auto px-lg pt-24">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-xl gap-md">
          <div>
            <h2 class="font-h1 text-h2 uppercase tracking-tight text-on-surface">MEU PROGRESSO</h2>
            <p class="text-on-surface-variant font-body-md">Sua jornada rumo à elite física.</p>
          </div>
          <button class="inline-flex items-center bg-surface-container-high px-md py-sm rounded-xl border border-outline-variant/30 hover:border-primary transition-colors">
            <span class="font-label-caps text-label-caps mr-sm">Semana</span>
            <span class="material-symbols-outlined text-primary">expand_more</span>
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-2xl">
          <div class="glass-card p-lg rounded-2xl flex flex-col items-center text-center">
            <span class="font-stat-lg text-stat-lg font-h3 text-primary">47</span>
            <span class="font-label-caps text-label-caps text-on-surface-variant mt-xs">treinos</span>
          </div>
          <div class="glass-card p-lg rounded-2xl flex flex-col items-center text-center">
            <span class="font-stat-lg text-stat-lg font-h3 text-tertiary">2.1k</span>
            <span class="font-label-caps text-label-caps text-on-surface-variant mt-xs">min</span>
          </div>
          <div class="glass-card p-lg rounded-2xl flex flex-col items-center text-center">
            <span class="font-stat-lg text-stat-lg font-h3 text-secondary">Nível 9</span>
            <span class="font-label-caps text-label-caps text-on-surface-variant mt-xs">ranque</span>
          </div>
          <div class="glass-card p-lg rounded-2xl flex flex-col items-center text-center">
            <span class="font-stat-lg text-stat-lg font-h3 text-error">🔥 12</span>
            <span class="font-label-caps text-label-caps text-on-surface-variant mt-xs">sequência</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <section class="lg:col-span-8 glass-card p-lg rounded-2xl">
            <h3 class="font-h3 text-h3 mb-xl uppercase tracking-widest text-on-surface flex items-center gap-sm">
              <span class="material-symbols-outlined text-primary">calendar_month</span>
              TREINOS DA SEMANA
            </h3>
            <div class="h-64 flex items-end justify-between px-md gap-sm">
              <ng-container *ngFor="let bar of weeklyBars">
                <div class="flex-1 flex flex-col items-center group">
                  <div class="w-full bg-surface-container-lowest rounded-t-lg relative overflow-hidden transition-all duration-300" [ngClass]="bar.active ? 'shadow-[0_0_18px_rgba(196,192,255,0.25)]' : ''" [style.height]="bar.height">
                    <div class="absolute bottom-0 w-full h-full" [ngClass]="bar.accentClass"></div>
                  </div>
                  <span class="mt-md font-label-caps text-label-caps" [ngClass]="bar.active ? 'text-primary font-bold' : 'text-on-surface-variant'">{{ bar.label }}</span>
                </div>
              </ng-container>
            </div>
          </section>

          <section class="lg:col-span-4 glass-card p-lg rounded-2xl flex flex-col">
            <h3 class="font-h3 text-h3 mb-lg uppercase tracking-widest text-on-surface">GRUPOS MUSCULARES</h3>
            <div class="relative flex-1 flex items-center justify-center py-md">
              <svg class="w-48 h-48 drop-shadow-2xl" viewBox="0 0 100 100">
                <polygon class="radar-grid" fill="none" points="50,5 95,38 78,90 22,90 5,38"></polygon>
                <polygon class="radar-grid" fill="none" points="50,25 72,41 64,67 36,67 28,41"></polygon>
                <polygon fill="rgba(196, 192, 255, 0.3)" points="50,20 85,45 68,85 32,80 20,40" stroke="#c4c0ff" stroke-width="2"></polygon>
              </svg>
              <div class="absolute top-0 font-label-caps text-[10px] text-primary">PEITO 22%</div>
              <div class="absolute top-[35%] right-0 font-label-caps text-[10px] text-tertiary">PERNA 25%</div>
              <div class="absolute bottom-0 right-[15%] font-label-caps text-[10px] text-secondary">COSTAS 20%</div>
              <div class="absolute bottom-0 left-[15%] font-label-caps text-[10px] text-on-surface-variant">BRAÇO 18%</div>
              <div class="absolute top-[35%] left-0 font-label-caps text-[10px] text-on-surface-variant">OMBRO 15%</div>
            </div>
          </section>

          <section class="lg:col-span-5 glass-card p-lg rounded-2xl">
            <h3 class="font-h3 text-h3 mb-lg uppercase tracking-widest text-on-surface flex items-center gap-sm">
              <span class="material-symbols-outlined text-tertiary">trophy</span>
              RECORDES DO MÊS
            </h3>
            <div class="space-y-md">
              <div *ngFor="let record of records" class="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-white/5">
                <div class="flex items-center gap-md">
                  <span class="material-symbols-outlined text-primary">trending_up</span>
                  <div>
                    <p class="font-body-md font-semibold">{{ record.label }}</p>
                    <p class="text-label-caps text-on-surface-variant">{{ record.detail }}</p>
                  </div>
                </div>
                <span class="font-h3 text-primary text-xl">{{ record.delta }}</span>
              </div>
            </div>
          </section>

          <section class="lg:col-span-7 glass-card p-lg rounded-2xl">
            <div class="flex items-center justify-between mb-lg">
              <h3 class="font-h3 text-h3 uppercase tracking-widest text-on-surface">EVOLUÇÃO DE XP</h3>
              <span class="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-highest px-sm py-xs rounded">Últimas 12 sem</span>
            </div>
            <div class="h-48 w-full relative pt-md">
              <svg class="w-full h-full overflow-visible" viewBox="0 0 400 150">
                <defs>
                  <linearGradient id="xpGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" style="stop-color:#8781ff; stop-opacity:0.2"></stop>
                    <stop offset="100%" style="stop-color:#c4c0ff; stop-opacity:1"></stop>
                  </linearGradient>
                </defs>
                <path d="M 0 140 Q 50 130 100 100 T 200 80 T 300 40 T 400 10" fill="none" stroke="url(#xpGradient)" stroke-linecap="round" stroke-width="4"></path>
                <path d="M 0 140 Q 50 130 100 100 T 200 80 T 300 40 T 400 10 V 150 H 0 Z" fill="rgba(196, 192, 255, 0.05)"></path>
                <circle class="primary-glow" cx="400" cy="10" fill="#c4c0ff" r="5"></circle>
              </svg>
              <div class="absolute bottom-0 w-full flex justify-between px-xs">
                <span class="text-[10px] font-label-caps text-on-surface-variant">W1</span>
                <span class="text-[10px] font-label-caps text-on-surface-variant">W4</span>
                <span class="text-[10px] font-label-caps text-on-surface-variant">W8</span>
                <span class="text-[10px] font-label-caps text-on-surface-variant">W12</span>
              </div>
            </div>
          </section>
        </div>

        <section class="mt-2xl relative overflow-hidden rounded-3xl p-xl glass-card border-primary/20">
          <div class="relative z-10 max-w-md">
            <span class="font-label-caps text-label-caps text-primary mb-sm block">PRÓXIMO OBJETIVO</span>
            <h4 class="font-h2 text-h2 mb-md">Chegue ao Nível 10 para desbloquear 'Mestre do Ferro'</h4>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-md">
              <div class="bg-primary h-full w-[82%] shadow-[0_0_10px_#c4c0ff]"></div>
            </div>
            <p class="text-body-md text-on-surface-variant">Faltam apenas 450 XP para sua próxima evolução.</p>
          </div>
          <div class="absolute right-[-10%] top-[-10%] opacity-20 rotate-12">
            <span class="material-symbols-outlined text-[200px] text-primary">military_tech</span>
          </div>
        </section>
      </main>

      <app-bottom-navbar></app-bottom-navbar>
    </div>
  `
})
export class ProgressComponent {
  readonly user = signal<User>({} as User);

  readonly weeklyBars = [
    { label: 'S', height: '40%', accentClass: 'bg-primary/20', active: false },
    { label: 'T', height: '75%', accentClass: 'bg-primary/40', active: false },
    { label: 'Q', height: '60%', accentClass: 'bg-primary/30', active: false },
    { label: 'Q', height: '90%', accentClass: 'bg-gradient-to-t from-primary/60 to-primary', active: true },
    { label: 'S', height: '50%', accentClass: 'bg-primary/25', active: false },
    { label: 'S', height: '20%', accentClass: 'bg-primary/10', active: false },
    { label: 'D', height: '0%', accentClass: 'bg-surface-container-lowest', active: false }
  ];

  readonly records = [
    { label: 'Supino', detail: '75 → 80kg', delta: '+5kg' },
    { label: 'Agachamento', detail: '90 → 100kg', delta: '+10kg' }
  ];

  constructor(private readonly dataService: MoovementDataService) {
    this.user.set(this.dataService.getUser());
  }
}

