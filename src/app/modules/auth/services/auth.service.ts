import { Injectable } from '@angular/core';
import { auth } from '../../../core/firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(auth, email, password));
  }

  public register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(auth, email, password));
  }

  public logout(): Observable<void> {
    return from(signOut(auth));
  }

  public getCurrentUser(): Observable<any> {
    return new Observable((observer) => {
      onAuthStateChanged(auth, (user) => {
        observer.next(user);
      });
    });
  }
}
