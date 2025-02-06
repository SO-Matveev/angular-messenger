import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from '../components/chat-dialog/chat-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/index';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { db } from '../../../core/firebase-config';
import { loadChatsSuccess, addChat, loadChatsFailure } from '../../../store/chat/chat.actions';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    // Подписываемся на изменения в коллекции чатов
    this.subscribeToChats();
  }

  private subscribeToChats(): void {
    const chatsRef = collection(db, 'chats');
    onSnapshot(chatsRef, 
      (snapshot) => {
        const chats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.store.dispatch(loadChatsSuccess({ chats }));
      },
      (error) => {
        console.error('Error listening to chats:', error);
        this.store.dispatch(loadChatsFailure({ error: error.message }));
      }
    );
  }

  // Загрузка чатов
  public loadChats(): Observable<any> {
    const chatsRef = collection(db, 'chats');
    return from(getDocs(chatsRef)).pipe(
      tap(querySnapshot => {
        console.log('Raw Firestore response:', querySnapshot);
      }),
      map((querySnapshot) => {
        const chats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Mapped chats:', chats);
        return loadChatsSuccess({ chats });
      }),
      catchError((error) => {
        console.error('Error loading chats:', error);
        return of(loadChatsFailure({ error: error.message }));
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

  // Добавление нового чата
  addChat(name: string): Observable<void> {
    const newChat = { 
      name, 
      createdAt: new Date().toISOString() 
    };
    
    return from(addDoc(collection(db, 'chats'), newChat)).pipe(
      tap((docRef) => {
        const chatWithId = { 
          id: docRef.id, 
          ...newChat 
        };
        this.store.dispatch(addChat({ chat: chatWithId }));
      }),
      map(() => null),
      catchError((error) => {
        console.error('Error adding chat:', error);
        return of(null);
      })
    );
  }
}
