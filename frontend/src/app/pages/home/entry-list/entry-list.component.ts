import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent {
  @Input() entries?: IEntry[];
  trackById = (index: number, item: any) => item.id;
}
