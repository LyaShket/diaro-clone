import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginModalComponent} from "../../shared/modals/login-modal/login-modal.component";
import {SignupModalComponent} from "../../shared/modals/signup-modal/signup-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  login() {
    this.modalService.open(LoginModalComponent);
  }

  signup() {
    this.modalService.open(SignupModalComponent);
  }
}
