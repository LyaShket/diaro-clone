import { BehaviorSubject } from 'rxjs';

export class LayoutServiceStub {
  toggleSidebar$ = new BehaviorSubject<boolean>(true);

  toggleSidebar() {
    this.toggleSidebar$.next(!this.toggleSidebar$.value);
  }
}
