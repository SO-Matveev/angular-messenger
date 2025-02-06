import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {ChatService} from '../../services/chat.service';
import { selectChats } from '../../../../store/chat/chat.selectors';
import {loadChats, selectChat} from '../../../../store/chat/chat.actions';
import { Chat } from '../../../../core/interfaces/interfaces';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
 protected chats$: Observable<Chat[]>;

  constructor(private store: Store, private chatService: ChatService) {
    this.chats$ = this.store.select(selectChats);
    
    // Добавим подписку для отладки
    this.chats$.subscribe(chats => {
      console.log('Current chats in component:', chats);
    });
  }

  ngOnInit(): void {
    console.log('ChatListComponent initialized');
    this.store.dispatch(loadChats());
  }

 public onSelectChat(chatId: string): void {
    this.store.dispatch(selectChat({ chatId }));
  }

  public onAddChat(): void {
    this.chatService.openAddChatDialog();
  }
}
