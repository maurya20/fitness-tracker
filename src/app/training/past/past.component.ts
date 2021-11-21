import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
})
export class PastComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'caloriesBurned',
    'state',
  ];
  dataSource = new MatTableDataSource<IExercise>([]);
  @ViewChild(MatSort) sort: MatSort;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.dataSource.data =
      this.exerciseService.getCompletedOrCancelledTrainings();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
