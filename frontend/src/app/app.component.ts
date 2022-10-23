import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DiaryEntryService} from "./shared/services/diary-entry.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', []),
    body: new FormControl('', [Validators.required])
  });

  entries: any[] = [];
  htmlstring: any;

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
      title: entry?.title?.trim(),
      body: entry?.body?.trim(),
      created: new Date().getTime(),
      updated: new Date().getTime(),
    };

    if (!entry.body) {
      return;
    }

    this.formGroup.reset();
    this.diaryEntryService.create(entry).then(() => {
      this.getAllEntries();
    });
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
  }
}
