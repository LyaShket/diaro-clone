import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import uniqid from 'uniqid';
import {IEntry} from "../../interfaces/entry";
import {ContentChange} from "ngx-quill";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {DiaryTagService} from "../../shared/services/diary-tag.service";
import {first, take} from "rxjs/operators";
import {ITag} from "../../interfaces/tag";
import {ICategory} from "../../interfaces/category";

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  entry: IEntry = {};
  formGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    tags: new FormControl(<ITag[]>[]),
    category: new FormControl(<ICategory>{}),
    mood: new FormControl(''),
  });

  content = '';
  edit = false;

  tags: ITag[] = [];
  categories: ICategory[] = [];
  moodList = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  sub: Subscription | undefined;
  loading = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private diaryEntryService: DiaryEntryService,
    private diaryTagService: DiaryTagService,
    private diaryCategoryService: DiaryCategoryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId || routeId === 'new') {
      this.buildForm({});
      this.edit = true;
    } else {
      this.getEntry(routeId);
    }

    this.getTags();
    this.getCategories();

    this.cdr.detectChanges();
  }

  getEntry(id: string) {
    this.sub = this.diaryEntryService.get(id).pipe(first()).subscribe(res => {
      if (!res) {
        return;
      }

      this.loading = false;
      this.entry = res;
      this.buildForm(this.entry);
      this.cdr.detectChanges();
    })
  }

  getTags() {
    this.diaryTagService.getAll().pipe(first()).subscribe(res => {
      if (!res) {
        return;
      }

      this.tags = res;
      this.cdr.detectChanges();
    });
  }

  getCategories() {
    this.diaryCategoryService.getAll().pipe(first()).subscribe(res => {
      if (!res) {
        return;
      }

      this.categories = res;
      this.cdr.detectChanges();
    });
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

    console.log('entry', entry);

    if (!entry.body) {
      return;
    }

    this.formGroup.reset();
    this.content = '';
    this.entry = entry;

    this.diaryEntryService.create(entry).pipe(first()).subscribe();

    this.edit = false;
    this.cdr.detectChanges();
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

  switchEdit(edit: boolean) {
    this.edit = edit;

    if (this.edit) {
      this.content = this.entry?.body || '';
      this.buildForm(this.entry);
    }

    this.cdr.detectChanges();
  }

  addNewTag(term: string) {
    const tag: ITag = {
      id: uniqid(),
      name: term
    };
    this.diaryTagService.create(tag).pipe(first()).subscribe();
    return tag;
  }

  addNewCategory(term: string) {
    const category: ICategory = {
      id: uniqid(),
      name: term
    };
    this.diaryCategoryService.create(category).pipe(first()).subscribe();
    return category;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
