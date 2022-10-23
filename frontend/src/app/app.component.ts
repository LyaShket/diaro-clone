import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DiaryEntryService} from "./shared/services/diary-entry.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuillEditorComponent} from "ngx-quill";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  entries: any[] = [];
  content: any;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.getAllEntries();
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
      this.getAllEntries();
    });

    this.cdr.detectChanges();
  }

  getAllEntries() {
    this.diaryEntryService.getAll().then(res => {
      if (!res || !res?.length) {
        return;
      }
      this.entries = res;
      console.log(res);
      this.cdr.detectChanges();
    });
  }

  onEditorChange(value: any) {
    this.formGroup.controls.body.setValue(value?.html);
    this.formGroup.controls.text.setValue(value?.text);
  }
}
