export interface IExercise {
  name: string;
  id: string;
  caloriesBurned: number;
  duration: number;
  state?: 'completed' | 'canceled' | null;
  date?: Date;
}
