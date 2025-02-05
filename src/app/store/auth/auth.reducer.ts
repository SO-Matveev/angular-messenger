import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/interfaces/interfaces';
import * as UserActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(UserActions.register, UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.registerFailure, UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
