export interface IExercise {
  name: string;
  id: string;
  caloriesBurned: number;
  duration: number;
  state?: 'completed' | 'cancelled' | null;
  date?: Date;
  user?: string;
}
