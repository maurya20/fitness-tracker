import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
})
export class PastComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'caloriesBurned', 'state'];
  dataSource = new MatTableDataSource<IExercise>();
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.dataSource.data =
      this.exerciseService.getCompletedOrCancelledTrainings();
  }
}
