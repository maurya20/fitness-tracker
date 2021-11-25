import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
@Injectable()
export class UiService {
  loadingStateChange = new Subject<boolean>();
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(msg, action, duration) {
    this.snackBar.open(msg, action, {
      duration: duration,
    });
  }
}
