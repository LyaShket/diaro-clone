import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {IEntry} from "../../interfaces/entry";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {DiaryTagService} from "../../shared/services/diary-tag.service";
import {first, take} from "rxjs/operators";

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit, OnDestroy {
  entry: IEntry = {};

  sub: Subscription | undefined;

  loading = true;
  edit = false;

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
      this.edit = true;
      this.loading = false;
      this.entry = {};
    } else {
      this.getEntry(routeId);
    }

    this.cdr.detectChanges();
  }

  getEntry(id: string) {
    this.sub = this.diaryEntryService.get(id).pipe(first()).subscribe(res => {
      if (!res) {
        return;
      }

      this.loading = false;
      this.entry = res;
      this.cdr.detectChanges();
    })
  }

  switchEdit(edit: boolean) {
    this.edit = edit;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onEntryChange(entry: IEntry) {
    this.entry = entry;
    this.edit = false;
  }
}
