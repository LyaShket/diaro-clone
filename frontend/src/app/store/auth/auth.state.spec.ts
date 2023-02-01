import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { Login } from './auth.actions';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

class MockStore {}

describe('Auth State', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState]),
        HttpClientModule,
      ],
      providers: [
        { provide: ToastrService, useClass: MockStore },
      ]
    });

    store = TestBed.inject(Store);
    store.reset(store.snapshot());
  });

  it('should not login', () => {
    store.dispatch(new Login({ username: null, password: null }));

    const user = store.selectSnapshot(AuthState.getUser);
    expect(user).toBeFalsy();
    expect(localStorage.getItem('access_token'))
      .withContext('LocalStorage item with the "access_token" key should not exist')
      .toBeFalsy();
  });

  it('should select default user', () => {
    const user = store.selectSnapshot(AuthState.getUser);
    expect(user).toBe(null);
  });
});
