import { Component, Input } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss']
})
export class EntryViewComponent {
  @Input() entry?: IEntry;
}
