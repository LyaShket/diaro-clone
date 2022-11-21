import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../shared/modals/login-modal/login-modal.component";
import {SignupModalComponent} from "../../shared/modals/signup-modal/signup-modal.component";
import {homeTour} from "../../shared/constants/tour/home";
import {GuidedTourService} from "ngx-guided-tour";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly modalService: NgbModal,
    private readonly guidedTourService: GuidedTourService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
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
}
