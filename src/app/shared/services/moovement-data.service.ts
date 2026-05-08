import { Injectable, signal } from '@angular/core';
import { User, Workout, Achievement, WeekDay } from '../models/moovement.models';

@Injectable({
  providedIn: 'root'
})
export class MoovementDataService {
  private readonly user = signal<User>({
    id: 'user-1',
    name: 'Lucas',
    level: 8,
    xp: 4200,
    nextLevelXp: 5800,
    streak: 7
  });

  private readonly workout = signal<Workout>({
    id: 'workout-1',
    title: 'Push Day - Peito + Tríceps',
    duration: '45 min',
    exercises: 8,
    xpReward: 150,
    recommended: true,
    muscles: ['Pectoral', 'Triceps'],
    exercisesList: [
      {
        id: 'ex-1',
        name: 'Supino Reto',
        sets: 4,
        reps: '10-12',
        muscle: 'Peito',
        intensity: 'High Intensity'
      },
      {
        id: 'ex-2',
        name: 'Crucifixo Máquina',
        sets: 3,
        reps: '15',
        muscle: 'Peito'
      },
      {
        id: 'ex-3',
        name: 'Tríceps Corda',
        sets: 4,
        reps: '12',
        muscle: 'Tríceps'
      },
      {
        id: 'ex-4',
        name: 'Paralelas',
        sets: 3,
        reps: 'Falha',
        muscle: 'Peito/Tríceps'
      }
    ]
  });

  private readonly achievements = signal<Achievement[]>([
    { id: 'achv-1', title: '7 Dias', unlocked: true, icon: '🔥' },
    { id: 'achv-2', title: 'Primeira PR', unlocked: true, icon: '💪' },
    { id: 'achv-3', title: 'Meta Secreta', unlocked: false, icon: '🔒' },
    { id: 'achv-4', title: 'Desafio Novo', unlocked: false, icon: '🔒' }
  ]);

  private readonly weekDays = signal<WeekDay[]>([
    { id: 'mon', label: 'SEG', completed: true },
    { id: 'tue', label: 'TER', completed: true },
    { id: 'wed', label: 'QUA', completed: true },
    { id: 'thu', label: 'QUI', completed: false },
    { id: 'fri', label: 'SEX', completed: false },
    { id: 'sat', label: 'SAB', completed: false },
    { id: 'sun', label: 'DOM', completed: false }
  ]);

  getUser() {
    return this.user();
  }

  getCurrentWorkout() {
    return this.workout();
  }

  getAchievements() {
    return this.achievements();
  }

  getWeeklyProgress() {
    return {
      weekDays: this.weekDays(),
      activeDay: 'thu',
      completedDays: ['mon', 'tue', 'wed']
    };
  }

  getStats() {
    return {
      workouts: 5,
      duration: '3h 40m',
      xpTotal: 750
    };
  }
}