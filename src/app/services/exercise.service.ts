import { Subject } from 'rxjs';
import { IExercise } from '../models/exercise.model';

export class ExerciseService {
  exerciseChanged = new Subject<IExercise>();
  private availableExercises: IExercise[] = [
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
  private runningExercise: IExercise;
  getAvailExercises() {
    return this.availableExercises.slice();
  }
  stratExercise(exercise: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === exercise
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }
  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
