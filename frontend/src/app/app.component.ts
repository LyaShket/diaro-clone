import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadProfile } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProfile());
  }

}
