import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  exercises: IExercise[] = [];
  exerciseSubscription: Subscription;
  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
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
