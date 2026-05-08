import { Injectable } from '@angular/core';
import { Achievement } from '../../shared/models/achievement.model';
import { User } from '../../shared/models/user.model';
import { Workout } from '../../shared/models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class FitquestDataService {
  getUser(): User {
    return {
      id: 'user-1',
      name: 'Lucas',
      level: 8,
      xp: 4200,
      nextLevelXp: 5800,
      streak: 7
    };
  }

  getCurrentWorkout(): Workout {
    return {
      id: 'workout-1',
      title: 'Push Day — Peito + Tríceps',
      duration: '45 min',
      exercises: 8,
      xpReward: 150,
      recommended: true
    };
  }

  getAchievements(): Achievement[] {
    return [
      { id: 'achv-1', title: '7 Dias', unlocked: true, icon: '🔥' },
      { id: 'achv-2', title: 'Primeira PR', unlocked: true, icon: '💪' },
      { id: 'achv-3', title: 'Meta Secreta', unlocked: false, icon: 'lock' },
      { id: 'achv-4', title: 'Desafio Novo', unlocked: false, icon: 'lock' }
    ];
  }

  getWeeklyProgress() {
    return {
      weekDays: [
        { id: 'mon', label: 'SEG', completed: true },
        { id: 'tue', label: 'TER', completed: true },
        { id: 'wed', label: 'QUA', completed: true },
        { id: 'thu', label: 'QUI', completed: false },
        { id: 'fri', label: 'SEX', completed: false },
        { id: 'sat', label: 'SAB', completed: false },
        { id: 'sun', label: 'DOM', completed: false }
      ],
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
