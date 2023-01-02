import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEntry } from '../../../interfaces/entry';
import * as url from 'url';

export interface ChangePublicEvent {
  _id: string,
  public: boolean,
}

@Component({
  selector: 'app-entry-actions',
  templateUrl: './entry-actions.component.html',
  styleUrls: ['./entry-actions.component.scss']
})
export class EntryActionsComponent {
  @Input() entry: IEntry;

  @Output() changePublic = new EventEmitter<ChangePublicEvent>();
  @Output() copyLink = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  setEntryPublic(entryPublic: boolean) {
    this.changePublic.emit({ _id: this.entry._id, public: entryPublic });
  }

  copyPublicEntryLink() {
    this.copyLink.emit(this.entry._id);
  }

  deleteEntry() {
    this.delete.emit(this.entry._id);
  }
}
