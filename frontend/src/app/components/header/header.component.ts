import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../shared/modals/login-modal/login-modal.component";
import {SignupModalComponent} from "../../shared/modals/signup-modal/signup-modal.component";
import {homeTour} from "../../shared/constants/tour/home";
import {GuidedTourService} from "ngx-guided-tour";
import {Router} from "@angular/router";
import { AuthService } from '../../shared/services/auth/auth.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../store/auth/auth.actions';
import { TagState } from '../../store/tag/tag.state';
import { ITag } from '../../interfaces/tag';
import { AuthState } from '../../store/auth/auth.state';
import { IUser } from '../../shared/interfaces/user';
import { SettingsModalComponent } from '../../shared/modals/settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @Select(AuthState.getUser) user$: Observable<IUser>;

  private destroyed$ = new Subject();

  constructor(
    private readonly modalService: NgbModal,
    private readonly guidedTourService: GuidedTourService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
  }

  login() {
    this.modalService.open(LoginModalComponent);
  }

  signup() {
    this.modalService.open(SignupModalComponent);
  }

  openSettings() {
    this.modalService.open(SettingsModalComponent);
  }

  startTour() {
    return this.router.navigate(['/']).then(() => {
      this.guidedTourService.startTour(homeTour);
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
