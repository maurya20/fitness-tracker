import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  exercises$: Observable<IExercise[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private exerciseService: ExerciseService,
    private store: Store<{ ui: fromTraining.State }>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.exerciseService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
