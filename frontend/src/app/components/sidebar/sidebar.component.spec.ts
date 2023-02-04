import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Store } from '@ngxs/store';
import { DiaryCategoryService } from '../../shared/services/diary-category/diary-category.service';
import { DiaryTagService } from '../../shared/services/diary-tag/diary-tag.service';
import { DiaryEntryService } from '../../shared/services/diary-entry/diary-entry.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

class MockService {}

describe('SidebarComponent', () => {
  let component: SidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SidebarComponent,
        { provide: DiaryCategoryService, useClass: MockService },
        { provide: DiaryTagService, useClass: MockService },
        { provide: DiaryEntryService, useClass: MockService },
        { provide: AuthService, useClass: MockService },
        { provide: Router, useClass: MockService },
        { provide: ChangeDetectorRef, useClass: MockService },
        { provide: ActivatedRoute, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(SidebarComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
