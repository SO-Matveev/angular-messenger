import { Component, Input } from '@angular/core';
import { Channel } from '../../../../core/interfaces/interfaces';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent {
  // Входные данные: список каналов
  @Input() channels: Channel[] = [];

  public addChannel() {
    const newChannel: Channel = {
      id: (this.channels.length + 1).toString(),
      name: `#new-channel-${this.channels.length + 1}`,
    };
    this.channels.push(newChannel);
  }
}
