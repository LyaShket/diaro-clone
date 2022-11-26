import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListPreviewComponent } from './entry-list-preview.component';

describe('EntryListPreviewComponent', () => {
  let component: EntryListPreviewComponent;
  let fixture: ComponentFixture<EntryListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryListPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
