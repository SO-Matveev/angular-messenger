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

  // Загрузка чатов с использованием RxJS
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
        console.log('Создан новый чат:', chat);
        // Диспатчим успешное добавление чата
        this.store.dispatch(addChatSuccess({ chat }));
      }),
      map(() => null),
      catchError(error => {
        console.error('Ошибка при создании чата:', error);
        this.store.dispatch(addChatFailure({ error }));
        return of(null);
      })
    );
  }


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

        console.log('Новые сообщения получены:', sortedMessages);
        subscriber.next(sortedMessages);
      }, error => {
        console.error('Ошибка при получении сообщений:', error);
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

  // Получение истории сообщений
  public getMessageHistory(chatId: string): Observable<Message[]> {
    const messagesRef = ref(dbChat, `messages/${chatId}`);

    return from(get(messagesRef)).pipe(
      map(snapshot => {
        const messages: Message[] = [];
        const data = snapshot as any;  // Добавляем приведение типа
        data.forEach((childSnapshot: any) => {
          messages.push({
            id: childSnapshot.key,
            chatId,
            ...childSnapshot.val()
          });
        });
        return messages.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }),
      tap(messages => console.log('История сообщений загружена:', messages))
    );
  }

  // Подписка на список чатов через Firestore
  subscribeToChats(): Observable<Chat[]> {
    return new Observable<Chat[]>(subscriber => {
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const chats: Chat[] = [];
          snapshot.forEach((doc) => {
            chats.push({
              id: doc.id,
              ...doc.data()
            } as Chat);
          });

          console.log('Получены чаты из Firestore:', chats);
          subscriber.next(chats);
        },
        (error) => {
          console.error('Ошибка при получении чатов:', error);
          subscriber.error(error);
        }
      );

      // Возвращаем функцию отписки
      return () => unsubscribe();
    });
  }
}
