import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IExercise } from '../models/exercise.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  private availableExercises: IExercise[] = [];
  private runningExercise: IExercise;
  private exercises: IExercise[] = [];
  constructor(private db: AngularFirestore) {}
  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((doc) => {
            return {
              id: doc.payload.doc['id'],
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              caloriesBurned: doc.payload.doc.data()['caloriesBurned'],
            };
          });
        })
      )
      .subscribe((exercises: IExercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }
  startExercise(exercise: string) {
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
