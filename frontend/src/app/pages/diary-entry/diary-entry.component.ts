import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {ActivatedRoute} from "@angular/router";
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import {IEntry} from "../../interfaces/entry";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {DiaryTagService} from "../../shared/services/diary-tag.service";
import {first, take} from "rxjs/operators";
import { Select, Store } from '@ngxs/store';
import { EntryState } from '../../store/states/entry.state';
import {
  SetActiveEntry,
  SetEdit,
  LoadActiveEntry,
  UpdateEntry,
  SetEntryPublic
} from '../../store/actions/entry.actions';
import { TagState } from '../../store/states/tag.state';
import { ITag } from '../../interfaces/tag';
import { CategoryState } from '../../store/states/category.state';
import { ICategory } from '../../interfaces/category';
import { AddCategory, LoadCategories } from '../../store/actions/category.actions';
import { AddTag, LoadTags } from '../../store/actions/tag.actions';
import { SearchState } from '../../store/states/search.state';
import { ChangePublicEvent } from './entry-actions/entry-actions.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  @Select(EntryState.getActiveEntry) entry$: Observable<IEntry>;
  @Select(EntryState.getLoading) loading$: Observable<boolean>;
  @Select(EntryState.getEdit) edit$: Observable<boolean>;

  @Select(TagState.getTags) tags$: Observable<ITag[]>;
  @Select(CategoryState.getCategories) categories$: Observable<ICategory[]>;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private diaryTagService: DiaryTagService,
    private diaryCategoryService: DiaryCategoryService,
    private route: ActivatedRoute,
    private store: Store,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId || routeId === 'new') {
      this.store.dispatch(new SetActiveEntry({}));
      this.store.dispatch(new SetEdit(true));
    } else {
      this.store.dispatch(new LoadActiveEntry(routeId));
    }

    this.store.dispatch(new LoadCategories());
    this.store.dispatch(new LoadTags());
  }

  switchEdit(edit: boolean) {
    this.store.dispatch(new SetEdit(edit));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetActiveEntry({}));
    this.store.dispatch(new SetEdit(false));
  }

  onEntryChange(entry: IEntry) {
    this.store.dispatch(new SetActiveEntry(entry));
    this.store.dispatch(new SetEdit(false));
    this.store.dispatch(new UpdateEntry(entry));
  }

  onAddCategory(category: ICategory) {
    this.store.dispatch(new AddCategory(category));
  }

  onAddTag(tag: ITag) {
    this.store.dispatch(new AddTag(tag));
  }

  onChangePublic(entryPublic: ChangePublicEvent) {
    this.store.dispatch(new SetEntryPublic(entryPublic.id, entryPublic.public));
  }

  onCopyLink(id: string) {
    navigator.clipboard.writeText(`${location.origin}/entry/public/${id}`).then(() => {
      this.toastr.success('Link successfully copied!');
    }, () => {
      this.toastr.error('Failed to copy link. Try to reload page or grant access');
    });
  }
}
