import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import uniqid from 'uniqid';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit {
  entry: any;
  formGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  content: any;
  edit = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private diaryEntryService: DiaryEntryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId || routeId === 'new') {
      this.buildForm(null);
      this.edit = true;
    } else {
      this.getEntry(routeId);
    }
    this.cdr.detectChanges();
  }

  getEntry(id: string) {
    this.diaryEntryService.get(id).then(res => {
      this.entry = res;
      this.buildForm(this.entry);
      this.cdr.detectChanges();
    })
  }

  send() {
    if (this.formGroup.invalid) {
      return;
    }

    let entry: any = this.formGroup.value;
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
    this.content = '';
    this.entry = entry;

    this.diaryEntryService.create(entry);

    this.edit = false;
    this.cdr.detectChanges();
  }

  onEditorChange(value: any) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }

  buildForm(entry: any) {
    this.formGroup.controls.id.setValue(entry?.id || uniqid());
    this.formGroup.controls.body.setValue(entry?.body || '');
    this.formGroup.controls.text.setValue(entry?.text || '');
    this.formGroup.controls.title.setValue(entry?.title || '');
  }

  switchEdit(edit: boolean) {
    this.edit = edit;

    if (this.edit) {
      this.content = this.entry.body;
      this.buildForm(this.entry);
    }

    this.cdr.detectChanges();
  }

}
