import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register, login } from '../../../../store/auth/auth.actions';
import {Observable} from 'rxjs';
import {selectAuthError, selectAuthLoading} from '../../../../store/auth/auth.selectors';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  protected authForm: FormGroup;
  public isLoginMode = false;
  public error$: Observable<string | null>;
  public loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.error$ = this.store.select(selectAuthError);
    this.loading$ = this.store.select(selectAuthLoading);
  }

  // Переключение между режимами входа и регистрации
  public switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  // Обработка отправки формы
  public onSubmit() {
    if (this.authForm.invalid) return;

    const { username, email, password } = this.authForm.value;

    if (this.isLoginMode) {
      this.store.dispatch(login({ email, password }));
    } else {
      this.store.dispatch(register({ username, email, password }));
    }
  }
}
