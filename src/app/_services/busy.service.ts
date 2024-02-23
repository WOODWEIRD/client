import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor() { }
  busy() {
    this.busyRequestCount++;
    delay(1000);
    return true;
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      return false;
    }
    return true;
  }

}
