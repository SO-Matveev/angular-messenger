import { createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectChatState = (state: { chat: ChatState }) => state.chat;

// Список чатов
export const selectChats = createSelector(
  selectChatState,
  (state: ChatState) => {
    return state.chats;
  }
);

// Выбранный чат
export const selectSelectedChat = createSelector(
  selectChatState,
  selectChats,
  (state, chats) => chats.find((chat) => chat.id === state.selectedChatId)
);

// Сообщения в выбранном чате
export const selectMessages = createSelector(
  selectChatState,
  (state) => state.messages
);

// Флаг загрузки
export const selectChatLoading = createSelector(
  selectChatState,
  (state) => state.loading
);

// Ошибки
export const selectChatError = createSelector(
  selectChatState,
  (state) => state.error
);
