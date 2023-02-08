import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadProfile } from './store/auth/auth.actions';
import { LayoutService } from './shared/services/layout/layout.service';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hideSidebar$: Observable<boolean>;

  constructor(
    private store: Store,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadProfile());
    this.hideSidebar$ = this.layoutService.toggleSidebar$.pipe(map((value) => !value));
  }

}
