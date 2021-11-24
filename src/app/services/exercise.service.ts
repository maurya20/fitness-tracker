import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { IExercise } from '../models/exercise.model';
import { map } from 'rxjs/operators';
import { UiService } from './ui.service';

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  startedExercisesChanged = new Subject<IExercise[]>();
  private availableExercises: IExercise[] = [];
  private runningExercise: IExercise;
  // private exercises: IExercise[] = [];
  private startedExercises: IExercise[] = [];
  private fbSubs: Subscription[] = [];
  constructor(private db: AngularFirestore, private uiService: UiService) {}
  fetchAvailableExercises() {
    this.uiService.loadingStateChange.next(true);
    this.fbSubs.push(
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
          this.uiService.loadingStateChange.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    );
  }

  ////ad to db
  private addToDb(exercise: IExercise) {
    this.db.collection('startedExercises').add(exercise);
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
    this.addToDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addToDb({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      caloriesBurned: this.runningExercise.caloriesBurned * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  fetchCompletedOrCancelledTrainings() {
    this.fbSubs.push(
      this.db
        .collection('startedExercises')
        .valueChanges()
        .subscribe((exercises: IExercise[]) => {
          this.startedExercises = exercises;
          this.startedExercisesChanged.next(exercises);
        })
    );
  }
  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
