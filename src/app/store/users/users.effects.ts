// store/users/users.effects.ts
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '../../modules/user-list/services/user.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUsers,
  updateUserStatus,
  updateUserStatusSuccess,
  updateUserStatusFailure,
  addUsersSuccess,
  addUsersFailure
} from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  // Загрузка списка пользователей
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.loadUsers().pipe(
          map(users => loadUsersSuccess({users})),
          catchError(error => of(loadUsersFailure({error})))
        )
      )
    )
  );

  // Обновление статуса пользователя (онлайн/офлайн)
  updateUserStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserStatus),
      mergeMap(({userId, isOnline}) =>
        this.userService.updateUserStatus(userId, isOnline).pipe(
          map(() => updateUserStatusSuccess({userId, isOnline})),
          catchError(error => of(updateUserStatusFailure({error})))
        )
      )
    )
  );

  // Добавление новых пользователей
  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUsers),
      mergeMap(({users}) =>
        this.userService.addUsers(users).pipe(
          map(() => addUsersSuccess({users})),
          catchError(error => of(addUsersFailure({error})))
        )
      )
    )
  );
}
