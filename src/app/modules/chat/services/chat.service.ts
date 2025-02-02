import { Injectable } from '@angular/core';
import { Channel, Message } from '../../../core/interfaces/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  getChannels(): Observable<Channel[]> {
    // Заменить на реальный запрос к Firebase
    return of([
      { id: '1', name: '#general' },
      { id: '2', name: '#summer' },
      { id: '3', name: '#party' },
    ]);
  }

  addChannel(channel: Channel): Observable<Channel> {
    // Заменить на реальный запрос к Firebase
    return of(channel);
  }

  getMessages(channelId: string): Observable<Message[]> {
    // Заменить на реальный запрос к Firebase
    return of([
      { id: '1', from_user: 'Maria', content: 'hey', channel_id: channelId },
      { id: '2', from_user: 'Max', content: 'hi, im work :(', channel_id: channelId },
    ]);
  }

  sendMessage(message: Message): Observable<Message> {
    // Заменить на реальный запрос к Firebase
    return of(message);
  }
}
