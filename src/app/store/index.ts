import { ActionReducerMap } from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';
import { chatReducer, ChatState } from './chat/chat.reducer';

export interface AppState {
  auth: AuthState;
  chat: ChatState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  chat: chatReducer,
};
