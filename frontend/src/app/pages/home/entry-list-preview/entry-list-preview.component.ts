import { Component, Input, OnInit } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entry-list-preview',
  templateUrl: './entry-list-preview.component.html',
  styleUrls: ['./entry-list-preview.component.scss']
})
export class EntryListPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
