import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent {

  formGroup = new FormGroup({
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  content: any;

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

    this.diaryEntryService.create(entry).then(() => {
      // this.getAllEntries();
    });

    this.cdr.detectChanges();
  }

  onEditorChange(value: any) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }

}
