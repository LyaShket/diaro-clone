import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntry } from '../../../interfaces/entry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  @Input() entries$?: Observable<IEntry[]>;

  trackById = (index: number, item: any) => item.id;

  constructor() { }

  ngOnInit(): void {
  }

}
