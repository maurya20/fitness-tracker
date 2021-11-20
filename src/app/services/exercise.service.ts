import { IExercise } from '../models/exercise.model';

export class ExerciseService {
  availableExercises: IExercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurned: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesBurned: 15 },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 120,
      caloriesBurned: 18,
    },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurned: 8 },
  ];
}
