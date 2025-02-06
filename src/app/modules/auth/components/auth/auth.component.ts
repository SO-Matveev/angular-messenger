import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register, login } from '../../../../store/auth/auth.actions';
import {Observable, Subject} from 'rxjs';
import {selectAuthError, selectAuthLoading} from '../../../../store/auth/auth.selectors';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  protected authForm: FormGroup;
  public isLoginMode = false;
  protected error$: Observable<string | null>;
  protected loading$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.error$ = this.store.select(selectAuthError).pipe(
      takeUntil(this.destroy$)
    );
    this.loading$ = this.store.select(selectAuthLoading).pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
