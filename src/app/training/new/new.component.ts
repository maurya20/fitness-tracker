import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  selectedValue: string;
  exercises: IExercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises = this.exerciseService.getAvailExercises();
  }
  onTrainingStart(form: NgForm) {
    this.exerciseService.stratExercise(form.value.exercise?.id);
  }
}
