import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { IExercise } from '../models/exercise.model';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as Training from '../training/training.actions';
import * as UI from '../shared/ui.actions';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  startedExercisesChanged = new Subject<IExercise[]>();
  user: string;
  private fbSubs: Subscription[] = [];
  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<{ ui: fromTraining.State }>
  ) {
    this.store.select(fromRoot.getLoggedUser).subscribe((user: string) => {
      this.user = user;
    });
  }
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
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
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
  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addToDb({
          ...ex,
          user: this.user,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addToDb({
          ...ex,
          duration: (ex.duration * progress) / 100,
          caloriesBurned: (ex.caloriesBurned * progress) / 100,
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }
  fetchCompletedOrCancelledTrainings() {
    this.fbSubs.push(
      this.db
        .collection('startedExercises')
        .valueChanges()
        .subscribe((exercises: IExercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }
  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
