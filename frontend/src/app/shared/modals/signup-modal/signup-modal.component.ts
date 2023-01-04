import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Login, Register } from '../../../store/actions/auth.actions';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { LoadCategories } from '../../../store/actions/category.actions';
import { LoadTags } from '../../../store/actions/tag.actions';
import { SearchEntries } from '../../../store/actions/search.actions';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {
  formGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordRepeat: ['', [Validators.required]],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.formGroup.value.password !== this.formGroup.value.passwordRepeat) {
      return;
    }

    this.store.dispatch(new Register(<any>this.formGroup.value)).pipe(first())
      .subscribe(() => {
        this.store.dispatch(new LoadCategories());
        this.store.dispatch(new LoadTags());
        this.store.dispatch(new SearchEntries());
        this.activeModal.close();
      });
  }

}
