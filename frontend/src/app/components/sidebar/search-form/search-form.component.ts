import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ITag } from '../../../interfaces/tag';
import { ICategory } from '../../../interfaces/category';
import { ISearchForm } from '../../../store/states/search.state';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NavigateSearch, UpdateForm } from '../../../store/actions/search.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnChanges {
  @Input() tags: ITag[];
  @Input() categories: ICategory[];
  @Input() formValues: ISearchForm;

  @Output() updateForm = new EventEmitter<ISearchForm>();

  text: string;
  moodList: string[] = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  form = this.fb.group({
    timeFrom: [''],
    timeTo: [''],
    text: [''],
    categories: [[] as string[]],
    tags: [[] as string[]],
    moods: [[] as string[]],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnChanges(): void {
    this.buildForm();
  }

  buildForm() {
    this.form.controls.timeFrom.setValue(this.formValues.timeFrom);
    this.form.controls.timeTo.setValue(this.formValues.timeTo);
    this.form.controls.text.setValue(this.formValues.text);
    this.form.controls.categories.setValue(this.formValues.categories);
    this.form.controls.tags.setValue(this.formValues.tags);
    this.form.controls.moods.setValue(this.formValues.moods);
  }

  submit() {
    this.store.dispatch(new UpdateForm(<ISearchForm>this.form.value))
      .pipe(first())
      .subscribe(() => {
        this.store.dispatch(new NavigateSearch());
      });
  }

  clickCategory(name: string) {
    if (this.form.value.categories.indexOf(name) > -1) {
      this.form.controls.categories.setValue(this.form.value.categories.filter(i => i !== name));
    } else {
      this.form.controls.categories.setValue([...this.form.value.categories, name]);
    }
    this.submit();
  }

  clickTag(name: string) {
    if (this.form.value.tags.indexOf(name) > -1) {
      this.form.controls.tags.setValue(this.form.value.tags.filter(i => i !== name));
    } else {
      this.form.controls.tags.setValue([...this.form.value.tags, name]);
    }
    this.submit();
  }

  clickMood(name: string) {
    if (this.form.value.moods.indexOf(name) > -1) {
      this.form.controls.moods.setValue(this.form.value.moods.filter(i => i !== name));
    } else {
      this.form.controls.moods.setValue([...this.form.value.moods, name]);
    }
    this.submit();
  }
}
