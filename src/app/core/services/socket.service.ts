import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(public socket: Socket) {
    this.socket.on('connect', () => {});

    this.socket.on('connect_error', (error) => {});
  }

  // Подписка на новые сообщения
  listenForMessages(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  // Отправка сообщения
  sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }

  // Подписка на добавление чата
  listenForNewChats(): Observable<any> {
    return this.socket.fromEvent('chatAdded');
  }
}
