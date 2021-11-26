import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  exercises: IExercise[] = [];
  private exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;
  constructor(
    private exerciseService: ExerciseService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.exerciseService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
