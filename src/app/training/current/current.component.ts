import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';
import { StopTrainingComponent } from './stop-training-component';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  progress = 0;
  playing = false;
  timmer: null | ReturnType<typeof setTimeout> = null;
  @Output() trainingExit = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private exerciseServise: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startResumeTimmer();
  }

  startResumeTimmer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        const step: number = (ex.duration / 100) * 1000;
        this.timmer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.exerciseServise.completeExercise();
            clearInterval(this.timmer);
          }
        }, step);
      });
  }
  onStop(): void {
    clearInterval(this.timmer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exerciseServise.cancelExercise(this.progress);
      } else {
        this.startResumeTimmer();
      }
    });
  }
  togglePlayBtn() {
    this.playing = !this.playing;
  }
}
