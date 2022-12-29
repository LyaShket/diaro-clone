import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryActionsComponent } from './entry-actions.component';

describe('EntryActionsComponent', () => {
  let component: EntryActionsComponent;
  let fixture: ComponentFixture<EntryActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
