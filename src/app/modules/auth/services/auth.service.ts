import { Injectable } from '@angular/core';
import { auth } from '../../../core/firebase-config'; // Импортируем Firebase Auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Вход пользователя
  public login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(auth, email, password).then(() => {}));
  }

  // Регистрация пользователя
  public register(email: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(auth, email, password).then(() => {}));
  }

  // Выход пользователя
  public logout(): Observable<void> {
    return from(signOut(auth));
  }

  // Получение текущего пользователя
  public getCurrentUser(): Observable<any> {
    return new Observable((observer) => {
      auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    });
  }
}
