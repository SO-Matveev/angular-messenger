import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { collection, getDocs, doc, setDoc, onSnapshot, query, where } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { db } from '../../../core/firebase-config';
import { User } from '../../../core/interfaces/interfaces';

import { 
  loadUsersSuccess, 
  loadUsersFailure,
  addUsersSuccess,
  updateUserStatusSuccess
} from '../../../store/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store) {
    this.subscribeToUsers();
  }

  private subscribeToUsers(): void {
    const usersRef = collection(db, 'users');
    onSnapshot(usersRef, 
      (snapshot) => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        this.store.dispatch(loadUsersSuccess({ users }));
      },
      (error) => {
        console.error('Error listening to users:', error);
        this.store.dispatch(loadUsersFailure({ error: error.message }));
      }
    );
  }

  public loadUsers(): Observable<User[]> {
    const usersRef = collection(db, 'users');
    return from(getDocs(usersRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[]),
      tap(users => {
        console.log('Loaded users:', users);
        this.store.dispatch(loadUsersSuccess({ users }));
      }),
      catchError(error => {
        console.error('Error loading users:', error);
        this.store.dispatch(loadUsersFailure({ error }));
        return of([]);
      })
    );
  }

  public addUsers(users: Partial<User>[]): Observable<void> {
    const batch = users.map(user => 
      setDoc(doc(collection(db, 'users')), {
        ...user,
        is_online: false,
        created_at: new Date().toISOString()
      })
    );

    return from(Promise.all(batch)).pipe(
      tap(() => {
        this.store.dispatch(addUsersSuccess({ users: users as User[] }));
      }),
      map(() => null),
      catchError(error => {
        console.error('Error adding users:', error);
        return of(null);
      })

    );
  }

  public updateUserStatus(userId: string, isOnline: boolean): Observable<void> {
    const userRef = doc(db, 'users', userId);
    return from(setDoc(userRef, { is_online: isOnline }, { merge: true })).pipe(
      tap(() => {
        this.store.dispatch(updateUserStatusSuccess({ userId, isOnline }));
      }),
      catchError(error => {
        console.error('Error updating user status:', error);
        return of(null);
      })
    );
  }


  public getUsersByIds(userIds: string[]): Observable<User[]> {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('id', 'in', userIds));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as User))
    );
  }
} 