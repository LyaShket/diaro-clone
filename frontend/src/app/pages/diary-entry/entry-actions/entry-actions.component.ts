import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';
import * as url from 'url';

export interface ChangePublicEvent {
  id: string,
  public: boolean,
}

@Component({
  selector: 'app-entry-actions',
  templateUrl: './entry-actions.component.html',
  styleUrls: ['./entry-actions.component.scss']
})
export class EntryActionsComponent implements OnInit {
  @Input() entry: IEntry;

  @Output() changePublic = new EventEmitter<ChangePublicEvent>();
  @Output() copyLink = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  setEntryPublic(entryPublic: boolean) {
    this.changePublic.emit({ id: this.entry.id, public: entryPublic });
  }

  copyPublicEntryLink() {
    this.copyLink.emit(this.entry.id);
  }
}
