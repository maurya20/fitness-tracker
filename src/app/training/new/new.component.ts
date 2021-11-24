import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  exercises: IExercise[] = [];
  private exerciseSubscription: Subscription;
  isLoading: boolean = true;
  private loadingSubs: Subscription;
  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChange.subscribe((state) => {
      this.isLoading = state;
    });
    this.uiService.loadingStateChange.next(true);
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
    this.loadingSubs.unsubscribe();
  }
}
