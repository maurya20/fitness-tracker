import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  exercises: IExercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.db
      .collection('availableExercises')
      .valueChanges()
      .subscribe((result) => {
        console.log('dbbbbbb?????', result);
      });
  }
  onTrainingStart(form: NgForm) {
    this.exerciseService.stratExercise(form.value.exercise);
  }
}
