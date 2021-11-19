import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  selectedValue: string;
  foods: object[] = [
    { value: 'steak-0', viewValue: 'Running' },
    { value: 'pizza-1', viewValue: 'Crunches' },
    { value: 'tacos-2', viewValue: 'Jumping' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
