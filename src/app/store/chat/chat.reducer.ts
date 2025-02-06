import { createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import {Chat, Message} from '../../core/interfaces/interfaces';

export interface ChatState {
  chats: Chat[]; // Список доступных чатов
  selectedChatId: string | null; // ID выбранного чата
  messages: Message[]; // Сообщения в выбранном чате
  loading: boolean; // Флаг загрузки
  error: any; // Ошибки
}

export const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  messages: [],
  loading: false,
  error: null,
};

export const chatReducer = createReducer(
  initialState,

  // Загрузка чатов
  on(ChatActions.loadChats, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ChatActions.loadChatsSuccess, (state, { chats }) => ({
    ...state,
    chats,
    loading: false,
  })),
  on(ChatActions.loadChatsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Выбор чата
  on(ChatActions.selectChat, (state, { chatId }) => ({
    ...state,
    selectedChatId: chatId,
    messages: [], // Очищаем сообщения при выборе нового чата
  })),
  // Добавление чата
  on(ChatActions.addChat, (state, { chat }) => ({
    ...state, chats: [...state.chats, chat] })),

  // Загрузка сообщений
  on(ChatActions.loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ChatActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false,
  })),
  on(ChatActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Получение нового сообщения
  on(ChatActions.receiveMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message], // Добавляем новое сообщение в список
  }))
);
