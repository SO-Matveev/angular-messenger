import { Component, Input } from '@angular/core';
import { Message } from '../../../../core/interfaces/interfaces';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  // Входные данные: список сообщений
  @Input() protected messages: Message[] = [];
}
