import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'workouts',
    loadComponent: () => import('./features/workouts/workouts.component').then((c) => c.WorkoutsComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress.component').then((c) => c.ProgressComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then((c) => c.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
