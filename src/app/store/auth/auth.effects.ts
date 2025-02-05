import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType } from '@ngrx/effects';
import {AuthService} from '../../modules/auth/services/auth.service';
import {register, registerSuccess, registerFailure, login, loginSuccess, loginFailure} from './auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  // Эффект для регистрации
  register$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(register),
        mergeMap((action) =>
          this.authService.register(action.username, action.email, action.password).pipe(
            map(() => registerSuccess()),
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
        mergeMap((action) =>
          this.authService.login(action.email, action.password).pipe(
            map((user) => loginSuccess({user})),
            catchError((error) => of(loginFailure({error})))
          )
        )
      )
    }
  );
}
