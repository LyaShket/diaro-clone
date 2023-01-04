import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListComponent } from './entry-list.component';

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render entries', () => {
    const entries = [
      {
        id: 1,
        title: 'Test Entry 1',
        description: 'Test Description 1',
        date: new Date()
      },
      {
        id: 2,
        title: 'Test Entry 2',
        description: 'Test Description 2',
        date: new Date()
      }
    ];
    component.entries = entries;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.entry-list-item').length).toEqual(2);
  });

});
