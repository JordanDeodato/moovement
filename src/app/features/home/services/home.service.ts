import { Injectable } from '@angular/core';
import { Achievement } from '../../../shared/models/achievement.model';
import { Workout } from '../../../shared/models/workout.model';
import { User } from '../../../shared/models/user.model';
import { FitquestDataService } from '../../../core/services/fitquest-data.service';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private readonly dataService: FitquestDataService) {}

  getUser(): User {
    return this.dataService.getUser();
  }

  getCurrentWorkout(): Workout {
    return this.dataService.getCurrentWorkout();
  }

  getAchievements(): Achievement[] {
    return this.dataService.getAchievements();
  }

  getWeeklyProgress() {
    return this.dataService.getWeeklyProgress();
  }

  getStats() {
    return this.dataService.getStats();
  }
}
