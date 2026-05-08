export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  exercises: number;
  xpReward: number;
  recommended: boolean;
  muscles?: string[];
  exercisesList?: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  muscle: string;
  intensity?: string;
}

export interface Achievement {
  id: string;
  title: string;
  unlocked: boolean;
  icon: string;
}

export interface WeekDay {
  id: string;
  label: string;
  completed: boolean;
}