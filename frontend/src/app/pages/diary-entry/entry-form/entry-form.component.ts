import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddTag, ITag } from '../../../interfaces/tag';
import { IAddCategory, ICategory } from '../../../interfaces/category';
import { ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {
  @Input() entry?: IEntry;
  @Input() tags?: ITag[];
  @Input() categories?: ICategory[];

  @Output() createEntry: EventEmitter<IEntry> = new EventEmitter<IEntry>();
  @Output() changeEntry: EventEmitter<IEntry> = new EventEmitter<IEntry>();
  @Output() addCategory: EventEmitter<IAddCategory> = new EventEmitter<IAddCategory>();
  @Output() addTag: EventEmitter<IAddTag> = new EventEmitter<IAddTag>();

  moodList = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  content = '';

  formGroup = this.fb.group({
    _id: [''],
    title: [''],
    body: ['', [Validators.required]],
    text: ['', [Validators.required]],
    tags: [[] as ITag[]],
    category: [{} as ICategory],
    mood: [''],
  });

  constructor(
    private fb: FormBuilder,
  ) {}

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

    if (entry._id) {
      this.changeEntry.emit(entry);
    } else {
      this.createEntry.emit(entry);
    }
  }

  onEditorChange(value: ContentChange) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }

  buildForm(entry: IEntry) {
    this.formGroup.controls._id.setValue(entry?._id);
    this.formGroup.controls.body.setValue(entry?.body || '');
    this.formGroup.controls.text.setValue(entry?.text || '');
    this.formGroup.controls.title.setValue(entry?.title || '');
    this.formGroup.controls.tags.setValue(entry?.tags || []);
    this.formGroup.controls.category.setValue(entry?.category || null);
    this.formGroup.controls.mood.setValue(entry?.mood || '');
  }

  addNewTag(term: string) {
    const tag: IAddTag = {
      name: term
    };
    this.addTag.emit(tag);
    return tag;
  }

  addNewCategory(term: string) {
    const category: IAddCategory = {
      name: term
    };
    this.addCategory.emit(category);
    return category;
  }

}
