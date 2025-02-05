import { Injectable } from '@angular/core';
import { auth, firestore } from '../../../core/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../core/interfaces/interfaces';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  // Регистрация пользователя
  register(username: string, email: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      switchMap((userCredential) => {
        const user: User = {
          id: uuidv4(),
          username,
          email,
          password: password, // Не храните пароль в открытом виде на практике
          is_online: true,
        };
        return setDoc(doc(firestore, 'users', user.id), user);
      })
    );
  }

  // Вход пользователя
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      switchMap((userCredential) => {
        const userId = userCredential.user?.uid;
        return new Observable<User>((observer) => {
          const userRef = doc(firestore, 'users', userId);
          onSnapshot(userRef, (snapshot) => {
            const user = snapshot.data() as User;
            observer.next(user);
          });
        });
      })
    );
  }

  public getCurrentUser(): Observable<any> {
    return new Observable((observer) => {
      onAuthStateChanged(auth, (user) => {
        observer.next(user);
      });
    });
  }
}
