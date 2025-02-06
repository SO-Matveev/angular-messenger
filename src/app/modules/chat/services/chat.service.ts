import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDatabase, ref, push, onValue, get } from 'firebase/database';
import {Observable, BehaviorSubject, from, fromEventPattern, catchError, of} from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { Message, Chat } from '../../../core/interfaces/interfaces';
import {loadChatsFailure, loadChatsSuccess, loadMessagesSuccess, addChat, addChatSuccess, addChatFailure} from '../../../store/chat/chat.actions';
import { dbChat, db } from '../../../core/firebase-config';
import {collection, getDocs, addDoc, onSnapshot, query, orderBy} from 'firebase/firestore';
import {ChatDialogComponent} from '../components/chat-dialog/chat-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AppState} from '../../../store/app.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentChatId$ = new BehaviorSubject<string | null>(null);

  constructor(
              private store: Store<AppState>,
              public dialog: MatDialog
  ) {
    // Подписываемся на изменения текущего чата и его сообщений
    this.setupMessagesSubscription();
  }

  // Загрузка чатов
  public loadChats(): Observable<any> {
    return from(getDocs(collection(db, 'chats'))).pipe(
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

  // Открываем диалог для добавления чата
  public openAddChatDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(
      filter((result) => !!result),
      switchMap((result) => this.addChat(result)),
    ).subscribe();
  }

  // Добавление нового чата
  addChat(name: string): Observable<void> {
    const chatsRef = collection(db, 'chats');
    const newChat = {
      name,
    };

    return from(addDoc(chatsRef, newChat)).pipe(
      tap(docRef => {
        const chat = {
          id: docRef.id,
          ...newChat
        };
        // Диспатчим успешное добавление чата
        this.store.dispatch(addChatSuccess({ chat }));
      }),
      map(() => null),
      catchError(error => {
        this.store.dispatch(addChatFailure({ error }));
        return of(null);
      })
    );
  }

  // Метод изменения текущего чата и его сообщений
  private setupMessagesSubscription(): void {
    this.currentChatId$.pipe(
      filter(chatId => chatId !== null),
      switchMap(chatId => this.createMessagesObservable(chatId!))
    ).subscribe(messages => {
      this.store.dispatch(loadMessagesSuccess({ messages }));
    });
  }

  // Создаем Observable для сообщений чата
  private createMessagesObservable(chatId: string): Observable<Message[]> {
    return new Observable<Message[]>(subscriber => {
      const messagesRef = ref(dbChat, `messages/${chatId}`);

      // Устанавливаем слушатель
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const messages: Message[] = [];
        snapshot.forEach((childSnapshot: any) => {
          messages.push({
            id: childSnapshot.key,
            chatId,
            ...childSnapshot.val()
          });
        });

        const sortedMessages = messages.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        subscriber.next(sortedMessages);
      }, error => {
        subscriber.error(error);
      });
      // Возвращаем функцию очистки
      return () => unsubscribe();
    });
  }

  // Установка текущего чата
  public setCurrentChat(chatId: string): void {
    this.currentChatId$.next(chatId);
  }

  // Отправка сообщения
  public sendMessage(message: Partial<Message>): Observable<void> {
    if (!message.chatId) {
      throw new Error('ChatId is required');
    }

    const messagesRef = ref(dbChat, `messages/${message.chatId}`);
    const newMessage = {
      content: message.content,
      from_user: message.from_user,
      timestamp: new Date().toISOString()
    };

    return from(push(messagesRef, newMessage)).pipe(
      tap(reference => {
        console.log('Сообщение отправлено:', {
          id: reference.key,
          ...message,
          ...newMessage
        });
      }),
      map(() => null)
    );
  }
}
