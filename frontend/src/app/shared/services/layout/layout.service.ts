import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  toggleSidebar$: BehaviorSubject<boolean>;

  constructor() {
    this.toggleSidebar$ = new BehaviorSubject<boolean>(window.innerWidth > 767);
  }

  toggleSidebar() {
    this.toggleSidebar$.next(!this.toggleSidebar$.value);
  }
}
