import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register, login } from '../../../../store/auth/auth.actions';
import { User } from '../../core/interfaces/interfaces';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  private authForm: FormGroup;
  public isLoginMode = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Переключение между режимами входа и регистрации
  public switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  // Обработка отправки формы
  public onSubmit() {
    if (this.authForm.invalid) return;

    // const { username, email, password } = this.authForm.value;
    const user: User = this.authForm.value

    if (this.isLoginMode) {
      this.store.dispatch(login({ email, password }));
    } else {
      this.store.dispatch(register({ username, email, password }));
    }
  }
}
