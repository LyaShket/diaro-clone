import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent {
  entry: any;
  formGroup = new FormGroup({
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  content: any;
  edit = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private diaryEntryService: DiaryEntryService,
  ) {
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

    this.diaryEntryService.create(entry).then(() => {
      // this.getAllEntries();
    });

    this.edit = false;
    this.cdr.detectChanges();
  }

  onEditorChange(value: any) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }

  buildForm(entry: any) {
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
