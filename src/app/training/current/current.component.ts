import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';
import { StopTrainingComponent } from './stop-training-component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timmer: null | ReturnType<typeof setTimeout> = null;
  @Output() trainingExit = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private exerciseServise: ExerciseService
  ) {}

  ngOnInit(): void {
    this.startResumeTimmer();
  }

  startResumeTimmer() {
    const step: number =
      this.exerciseServise.getRunningExercise() &&
      (this.exerciseServise.getRunningExercise().duration / 100) * 1000;

    this.timmer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timmer);
      }
    }, step);
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
        this.trainingExit.emit();
      } else {
        this.startResumeTimmer();
      }
    });
  }
}
