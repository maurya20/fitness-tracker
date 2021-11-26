import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { IExercise } from '../models/exercise.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { UiService } from '../shared/ui.service';
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
  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}
  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
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
        .subscribe(
          (exercises: IExercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              'Failed to load available Exercises',
              null,
              4000
            );
            this.exercisesChanged.next(null);
          }
        )
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
