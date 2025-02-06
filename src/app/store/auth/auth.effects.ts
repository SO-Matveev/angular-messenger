import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType } from '@ngrx/effects';
import {AuthService} from '../../modules/auth/services/auth.service';
import {register, registerSuccess, registerFailure, login, loginSuccess, loginFailure} from './auth.actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }

  // Эффект для регистрации
  register$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(register),
        mergeMap((action) =>
          this.authService.register(action.username, action.email, action.password).pipe(
            map(() => registerSuccess()),
            tap(() => this.router.navigate(['/'])),
            catchError((error) => of(registerFailure({error})))
          )
        )
      )
    }
  );

  // Эффект для входа
  login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(login),
        switchMap((action) =>
          this.authService.login(action.email, action.password).pipe(
            map((user) => loginSuccess({user})),
            tap(() => this.router.navigate(['/'])),
            catchError((error) => of(loginFailure({error})))
          )
        )
      )
    }
  );
}
