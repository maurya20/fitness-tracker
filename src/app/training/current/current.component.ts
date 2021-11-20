import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startResumeTimmer();
  }

  startResumeTimmer() {
    this.timmer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timmer);
      }
    }, 1000);
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
