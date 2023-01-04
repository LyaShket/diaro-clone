import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormComponent } from './entry-form.component';
import { IEntry } from '../../../interfaces/entry';
import { FormBuilder } from '@angular/forms';

describe('EntryFormComponent', () => {
  let component: EntryFormComponent;
  let fixture: ComponentFixture<EntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryFormComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;

    spyOn(component.createEntry, 'emit');
    spyOn(component.changeEntry, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a formGroup', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should have a moodList', () => {
    expect(component.moodList).toBeTruthy();
  });

  it('should have a send function', () => {
    expect(component.send).toBeTruthy();
  });

  it('should have a buildForm function', () => {
    expect(component.buildForm).toBeTruthy();
  });

  it('should build a form', () => {
    const entry: IEntry = {
      _id: '123',
      title: 'test',
      body: 'test',
      text: 'test',
      tags: [
        {
          _id: '123',
          name: 'test',
        },
      ],
      category: {
        _id: '123',
        name: 'test',
      },
      mood: 'test',
    };
    component.buildForm(entry);
    expect(component.formGroup.value).toEqual(entry);
  });

  it('should send a form and emit createEntry', () => {
    const entry: IEntry = {
      title: 'test',
      body: 'test',
      text: 'test',
      tags: [
        {
          _id: '123',
          name: 'test',
        },
      ],
      category: {
        _id: '123',
        name: 'test',
      },
      mood: 'test',
    };
    component.buildForm(entry);
    component.send();
    expect(component.createEntry.emit).toHaveBeenCalled();
  });

  it('should send a form and emit changeEntry', () => {
    const entry: IEntry = {
      _id: '123',
      title: 'test',
      body: 'test',
      text: 'test',
      tags: [
        {
          _id: '123',
          name: 'test',
        },
      ],
      category: {
        _id: '123',
        name: 'test',
      },
      mood: 'test',
    };
    component.buildForm(entry);
    component.send();
    expect(component.changeEntry.emit).toHaveBeenCalled();
  });

  it('should not send a form', () => {
    const entry: IEntry = {
      title: 'test',
      body: '',
      text: '',
      tags: [
        {
          _id: '123',
          name: 'test',
        },
      ],
      category: {
        _id: '123',
        name: 'test',
      },
      mood: 'test',
    };
    component.buildForm(entry);
    component.send();
    expect(component.createEntry.emit).not.toHaveBeenCalled();
  });

});
