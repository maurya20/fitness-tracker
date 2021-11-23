import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IExercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss'],
})
export class PastComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'caloriesBurned',
    'state',
  ];
  dataSource = new MatTableDataSource<IExercise>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private activeSubs: Subscription;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.activeSubs = this.exerciseService.startedExercisesChanged.subscribe(
      (exercises: IExercise[]) => {
        this.dataSource.data = exercises;
      }
    );

    this.exerciseService.fetchCompletedOrCancelledTrainings();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    this.activeSubs.unsubscribe();
  }
}
