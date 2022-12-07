import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Login } from '../../../store/actions/auth.actions';
import { first } from 'rxjs/operators';
import { LoadCategories } from '../../../store/actions/category.actions';
import { LoadTags } from '../../../store/actions/tag.actions';
import { SearchEntries } from '../../../store/actions/entry.actions';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
    private readonly store: Store,
  ) {
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.store.dispatch(new Login(<any>this.formGroup.value)).pipe(first())
      .subscribe(() => {
        this.store.dispatch(new LoadCategories());
        this.store.dispatch(new LoadTags());
        this.store.dispatch(new SearchEntries());
        this.activeModal.close();
      });
  }

}
