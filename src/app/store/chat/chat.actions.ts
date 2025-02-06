import {createAction, props} from '@ngrx/store';
import {Chat, Message} from '../../core/interfaces/interfaces';


// Загрузка чатов
export const loadChats = createAction('[Chat] Load Chats');

export const loadChatsSuccess = createAction(
  '[Chat] Load Chats Success',
  props<{ chats: Chat[] }>()
);
export const loadChatsFailure = createAction(
  '[Chat] Load Chats Failure',
  props<{ error: any }>()
);

// Выбор чата
export const selectChat = createAction(
  '[Chat] Select Chat',
  props<{ chatId: string }>()
);
// ДОбавление чата
export const addChat = createAction(
  '[Chat] Add Chat',
  props<{ chat: Chat }>()
);

// Загрузка сообщений
export const loadMessages = createAction(
  '[Chat] Load Messages',
  props<{ chatId: string }>()
);
export const loadMessagesSuccess = createAction(
  '[Chat] Load Messages Success',
  props<{ messages: Message[] }>()
);
export const loadMessagesFailure = createAction(
  '[Chat] Load Messages Failure',
  props<{ error: any }>()
);

// Получение нового сообщения
export const receiveMessage = createAction(
  '[Chat] Receive Message',
  props<{ message: Message }>()
);

// Добавление чата
export const addChatSuccess = createAction(
  '[Chat] Add Chat Success',
  props<{ chat: Chat }>()
);

export const addChatFailure = createAction(
  '[Chat] Add Chat Failure',
  props<{ error: any }>()
);

