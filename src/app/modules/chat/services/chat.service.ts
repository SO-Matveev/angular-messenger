import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from '../components/chat-dialog/chat-dialog.component';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/index';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {firestore} from '../../../core/firebase-config';
import {loadChatsSuccess, addChat, loadChatsFailure } from '../../../store/chat/chat.actions';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private socket: Socket
  ) {
    // Подписка на событие добавления чата через Socket.io
    this.socket.fromEvent('chatAdded').subscribe((chat: any) => {
      this.store.dispatch(addChat({ chat }));
    });
  }

  // Загрузка чатов с использованием RxJS
  public loadChats(): Observable<any> {
    return from(getDocs(collection(firestore, 'chats'))).pipe(
      map((querySnapshot) => {
        const chats = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return loadChatsSuccess({ chats }); // Возвращаем action вместо dispatch
      }),
      catchError((error) => {
        console.error('Error loading chats:', error);
        return of(loadChatsFailure({ error }));
      })
    );
  }

  // Открытие диалогового окна для добавления чата
  openAddChatDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addChat(result).subscribe();
      }
    });
  }

  // Добавление нового чата с использованием RxJS
  addChat(name: string): Observable<void> {
    const newChat = { name };
    return from(addDoc(collection(firestore, 'chats'), newChat)).pipe(
      map((docRef) => {
        this.socket.emit('addChat', { id: docRef.id, ...newChat });
      }),
      catchError((error) => {
        console.error('Error adding chat:', error);
        return of(); // Возвращаем пустой Observable в случае ошибки
      })
    );
  }
}
