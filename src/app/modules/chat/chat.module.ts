import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageListComponent} from './components/message-list/message-list.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {ChatComponent} from './components/chat/chat.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {ChatDialogComponent} from './components/chat-dialog/chat-dialog.component';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';


@NgModule({
  declarations: [ChatComponent, MessageListComponent, ChatListComponent, ChatDialogComponent],
  imports: [CommonModule, MatListModule, MatButtonModule, MatCardModule, MatInputModule, FormsModule, MatIconModule, MatDialogModule],
  exports: [MessageListComponent, ChatComponent, ChatListComponent],
  providers: [MatDialog]
})
export class ChatModule {
}
