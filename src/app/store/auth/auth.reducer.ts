import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutSuccess } from './auth.actions';

export interface AuthState {
  user: any | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logoutSuccess, (state) => ({ ...state, user: null }))
);
