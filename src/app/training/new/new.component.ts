import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  selectedValue: string;
  foods: object[] = [
    { value: 'steak-0', viewValue: 'Running' },
    { value: 'pizza-1', viewValue: 'Crunches' },
    { value: 'tacos-2', viewValue: 'Jumping' },
  ];

  constructor() {}

  ngOnInit(): void {}
  onTrainingStart() {
    this.trainingStart.emit();
  }
}
