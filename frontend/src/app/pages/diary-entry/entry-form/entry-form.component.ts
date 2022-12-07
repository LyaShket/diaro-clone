import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from '../../../interfaces/tag';
import { ICategory } from '../../../interfaces/category';
import { ContentChange } from 'ngx-quill';
import uniqid from 'uniqid';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {
  @Input() entry?: IEntry;
  @Input() tags?: ITag[];
  @Input() categories?: ICategory[];

  @Output() entryChange: EventEmitter<IEntry> = new EventEmitter<IEntry>();
  @Output() addCategory: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() addTag: EventEmitter<ITag> = new EventEmitter<ITag>();

  moodList = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  content = '';

  formGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    tags: new FormControl(<ITag[]>[]),
    category: new FormControl(<ICategory>{}),
    mood: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    if (!this.entry) {
      return;
    }

    this.content = this.entry?.body || '';
    this.buildForm(this.entry);
  }

  send() {
    if (this.formGroup.invalid) {
      return;
    }

    let entry: IEntry = <IEntry>this.formGroup.value;
    entry = {
      ...entry,
      title: entry?.title?.trim(),
      text: entry?.text?.trim(),
      created: new Date().getTime(),
      updated: new Date().getTime(),
    };

    if (!entry.body) {
      return;
    }

    this.formGroup.reset();
    this.entryChange.emit(entry);
  }

  onEditorChange(value: ContentChange) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }

  buildForm(entry: IEntry) {
    this.formGroup.controls.id.setValue(entry?.id || uniqid());
    this.formGroup.controls.body.setValue(entry?.body || '');
    this.formGroup.controls.text.setValue(entry?.text || '');
    this.formGroup.controls.title.setValue(entry?.title || '');
    this.formGroup.controls.tags.setValue(entry?.tags || []);
    this.formGroup.controls.category.setValue(entry?.category || null);
    this.formGroup.controls.mood.setValue(entry?.mood || '');
  }

  addNewTag(term: string) {
    const tag: ITag = {
      id: uniqid(),
      name: term
    };
    this.addTag.emit(tag);
    return tag;
  }

  addNewCategory(term: string) {
    const category: ICategory = {
      id: uniqid(),
      name: term
    };
    this.addCategory.emit(category);
    return category;
  }

}
