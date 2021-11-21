import { Subject } from 'rxjs';
import { IExercise } from '../models/exercise.model';
////import 'rxjs/add/operator/map';

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
  private exercises: IExercise[] = [];
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
  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      caloriesBurned: this.runningExercise.caloriesBurned * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getCompletedOrCancelledTrainings() {
    return this.exercises.slice();
  }
}
