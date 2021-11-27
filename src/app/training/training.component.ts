import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/exercise.service';
import * as fromTraining from '../training/training.reducer';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIstraining);
  }
}
