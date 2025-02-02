import { Component, Input } from '@angular/core';
import { Channel } from '../../../../core/interfaces/interfaces';
import {ChatService} from '../../services/chat.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent {
  // Входные данные: список каналов
  @Input() channels: Channel[] = [];

  constructor(public chatservice: ChatService) {
  }

  public addChannel() {
    const newChannel: Channel = {
      id: uuidv4(),
      name: `#new-channel-${this.channels.length + 1}`,
    };
    this.chatservice.addChannel(newChannel)
  }
}
