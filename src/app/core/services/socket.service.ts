import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(private socket: Socket) {}

  // Подписка на новые сообщения
  listenForMessages(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  // Отправка сообщения
  sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }
}
