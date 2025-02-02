import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ChatListComponent, MessageListComponent],
  imports: [CommonModule, MatListModule, MatButtonModule],
  exports: [ChatListComponent, MessageListComponent], // Экспортируем компоненты для использования в других модулях
})
export class ChatModule {}
