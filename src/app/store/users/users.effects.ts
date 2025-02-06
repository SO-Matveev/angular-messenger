// store/users/users.effects.ts
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {collection, doc, setDoc, onSnapshot} from 'firebase/firestore';
import {firestore} from '../../core/firebase-config';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUsers,
  updateUserStatus,
  updateUserStatusSuccess, updateUserStatusFailure, addUsersSuccess, addUsersFailure
} from './users.actions';
import {User} from '../../core/interfaces/interfaces'
import {Action} from '@ngrx/store';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions) {
  }

  // Загрузка списка пользователей
  loadUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() =>
          new Observable<Action>((observer) => {
            const usersRef = collection(firestore, 'users');
            const unsubscribe = onSnapshot(usersRef, (snapshot) => {
              const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as User[];
              observer.next(loadUsersSuccess({users}));
            }, (error) => {
              observer.error(loadUsersFailure({error}));
            });
            return () => unsubscribe();
          }).pipe(
            catchError((error) => of(loadUsersFailure({error})))
          )
        )
      )
    }
  );

  // Обновление статуса пользователя (онлайн/офлайн)
  updateUserStatus$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(updateUserStatus),
        mergeMap(({userId, isOnline}) =>
          from(setDoc(doc(firestore, 'users', userId), {isOnline}, {merge: true})).pipe(
            map(() => updateUserStatusSuccess({userId, isOnline})),
            catchError((error) => of(updateUserStatusFailure({error})))
          )
        )
      )
    }
  );

  // Добавление новых пользователей
  addUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(addUsers),
        mergeMap(({users}) =>
          from(Promise.all(
            users.map((user) =>
              setDoc(doc(firestore, 'users', user.id), user)
            )
          )).pipe(
            map(() => addUsersSuccess({users})),
            catchError((error) => of(addUsersFailure({error})))
          )
        )
      )
    }
  );
}
