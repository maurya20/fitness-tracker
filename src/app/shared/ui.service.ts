import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(msg, action, duration) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }
}
