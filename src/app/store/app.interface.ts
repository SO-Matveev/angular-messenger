import { ActionReducerMap } from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';
import { chatReducer, ChatState } from './chat/chat.reducer';
import {usersReducer, UsersState} from './users/users.reducer';

export interface AppState {
  auth: AuthState;
  chat: ChatState;
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  chat: chatReducer,
  users: usersReducer,
};
