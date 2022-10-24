import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entries: any[] = [];

  constructor(
    private diaryEntryService: DiaryEntryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllEntries();
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

}
