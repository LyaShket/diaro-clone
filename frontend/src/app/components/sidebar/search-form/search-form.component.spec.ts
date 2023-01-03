import { TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;


describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let dispatchSpy: Spy;

  beforeEach(() => {
    const store = jasmine.createSpyObj<Store>('Store', ['dispatch']);
    dispatchSpy = store.dispatch.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        SearchFormComponent,
        { provide: Store, useValue: store },
      ],
    });

    component = TestBed.inject(SearchFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: ['tag'],
      moods: ['mood'],
    };
    component.ngOnChanges();
    expect(component.form.value).toEqual(component.formValues);
  });

  it('should submit form and navigate search', () => {
    component.submit();
    expect(dispatchSpy.calls.count())
      .withContext('spy method was called twice')
      .toBe(2);
  });

  it('should add multiple categories to form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: [],
      tags: ['tag'],
      moods: ['mood'],
    };
    component.ngOnChanges();
    component.clickCategory('category');
    component.clickCategory('category2');
    expect(component.form.value.categories).toEqual(['category', 'category2']);
  });

  it('should remove category from form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: ['tag'],
      moods: ['mood'],
    };
    component.ngOnChanges();
    component.clickCategory('category');
    expect(component.form.value.categories).toEqual([]);
  });

  it('should add multiple tags to form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: [],
      moods: ['mood'],
    };
    component.ngOnChanges();
    component.clickTag('tag');
    component.clickTag('tag2');
    expect(component.form.value.tags).toEqual(['tag', 'tag2']);
  });

  it('should remove tag from form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: ['tag'],
      moods: ['mood'],
    };
    component.ngOnChanges();
    component.clickTag('tag');
    expect(component.form.value.tags).toEqual([]);
  });

  it('should add multiple moods to form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: ['tag'],
      moods: [],
    };
    component.ngOnChanges();
    component.clickMood('mood');
    component.clickMood('mood2');
    expect(component.form.value.moods).toEqual(['mood', 'mood2']);
  });

  it('should remove mood from form', () => {
    component.formValues = {
      timeFrom: '2021-01-01',
      timeTo: '2021-01-01',
      text: 'text',
      categories: ['category'],
      tags: ['tag'],
      moods: ['mood'],
    };
    component.ngOnChanges();
    component.clickMood('mood');
    expect(component.form.value.moods).toEqual([]);
  });


});
