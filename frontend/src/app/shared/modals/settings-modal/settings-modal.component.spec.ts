import { TestBed } from '@angular/core/testing';

import { SettingsModalComponent } from './settings-modal.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import Spy = jasmine.Spy;
import { IUser } from '../../interfaces/user';

describe('SettingsModalComponent', () => {
  let component: SettingsModalComponent;
  let dispatchSpy: Spy;

  beforeEach(() => {
    const store = jasmine.createSpyObj<Store>('Store', ['dispatch']);
    dispatchSpy = store.dispatch.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        SettingsModalComponent,
        { provide: Store, useValue: store },
      ],
    });

    component = TestBed.inject(SettingsModalComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form with user avatar', () => {
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of({ avatar: 'https://example.com' } as IUser);
    component.ngOnInit();
    expect(component.formGroup.controls.avatar.value).toEqual('https://example.com');
  });

  it('should not init form when user is null', () => {
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of(null);
    component.ngOnInit();
    expect(component.formGroup.controls.avatar.value).toEqual('');
  })

  it('should submit form', () => {
    component.submit();
    expect(dispatchSpy.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should return true if avatar is valid and false is not', () => {
    component.formGroup.controls.avatar.setValue('https://example.com');
    expect(component.formGroup.valid).toEqual(true);
    component.formGroup.controls.avatar.setValue('example.com');
    expect(component.formGroup.valid).toEqual(false);
  });
});
