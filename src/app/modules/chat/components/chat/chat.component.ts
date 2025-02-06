import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from '../../../../core/interfaces/interfaces';
import { SocketService } from '../../../../core/services/socket.service';
import { Subscription } from 'rxjs';
import {receiveMessage, sendMessage, selectChat} from '../../../../store/chat/chat.actions';
import {AuthService} from '../../../auth/services/auth.service';
import {selectMessages, selectSelectedChat} from '../../../../store/chat/chat.selectors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  // Выбранный чат
  protected selectedChat$ = this.store.select(selectSelectedChat);
  // Сообщения текущего чата
  protected messages$ = this.store.select(selectMessages);
  // Текст нового сообщения
  public newMessage = '';
  // ID текущего пользователя
  public currentUserId: string | null = null;

  private messageSubscription!: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    // Получаем ID текущего пользователя
    this.currentUserId = this.authService.getCurrentUserId();

    // Подписываемся на новые сообщения через Socket.io
    this.messageSubscription = this.socketService.listenForMessages().subscribe((message) => {
      this.store.dispatch(receiveMessage({ message }));
    });
  }

  // Отправка сообщения
  public sendMessage(): void {
    if (this.newMessage.trim() && this.currentUserId) {
      const message: Partial<Message> = {
        content: this.newMessage,
        from_user: this.currentUserId,
        // chatId: this.selectedChat$?.id,
        timestamp: new Date().toISOString(),
      };
      this.store.dispatch(sendMessage({ message }));
      this.newMessage = ''; // Очищаем поле ввода
    }
  }

  // Выбор чата
  public selectChat(chatId: string): void {
    this.store.dispatch(selectChat({ chatId }));
  }

  ngOnDestroy(): void {
    // Отписываемся от Socket.io при уничтожении компонента
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
