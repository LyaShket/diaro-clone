import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../shared/modals/login-modal/login-modal.component";
import {SignupModalComponent} from "../../shared/modals/signup-modal/signup-modal.component";
import {homeTour} from "../../shared/constants/tour/home";
import {GuidedTourService} from "ngx-guided-tour";
import {Router} from "@angular/router";
import { AuthService } from '../../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthorized = false;

  private destroyed$ = new Subject();

  constructor(
    private readonly modalService: NgbModal,
    private readonly guidedTourService: GuidedTourService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(res => {
      this.isAuthorized = !!res;
    });
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

  startTour() {
    this.router.navigate(['/']).then(() => {
      this.guidedTourService.startTour(homeTour);
    });
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
