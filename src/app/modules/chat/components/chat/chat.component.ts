import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, withLatestFrom, tap } from 'rxjs/operators';
import { Message } from '../../../../core/interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatService } from '../../services/chat.service';
import { selectMessages, selectSelectedChat } from '../../../../store/chat/chat.selectors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  protected selectedChat$ = this.store.select(selectSelectedChat);
  protected messages$ = this.store.select(selectMessages);
  public newMessage = '';
  public currentUserId: string | null = null;

  private destroy$ = new Subject<void>();
  private sendMessage$ = new Subject<string>();

  constructor(
    private store: Store,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.setupMessageSending();
  }

  // Подписываемся на выбранный чат и возможность отправлять сообщения
  private setupMessageSending(): void {
    this.sendMessage$.pipe(
      takeUntil(this.destroy$),
      withLatestFrom(this.selectedChat$),
      filter(([content, chat]) => !!content && !!chat && !!this.currentUserId),
      tap(([content, chat]) => {
        const message: Partial<Message> = {
          content,
          from_user: this.currentUserId!,
          chatId: chat!.id,
          timestamp: new Date().toISOString()
        };
        this.chatService.sendMessage(message).subscribe(
          () => this.newMessage = '',
          error => console.error('Ошибка при отправке сообщения:', error)
        );
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();

    // Подписываемся на изменения выбранного чата
    this.selectedChat$.pipe(
      takeUntil(this.destroy$),
      filter(chat => !!chat),
      tap(chat => {
        console.log('Выбран чат:', chat);
        this.chatService.setCurrentChat(chat!.id);
      })
    ).subscribe();
  }

  // Метод для отправки сообщения
  public onSendMessage(): void {
    if (this.newMessage.trim()) {
      this.sendMessage$.next(this.newMessage.trim());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
