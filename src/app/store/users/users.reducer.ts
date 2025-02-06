import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/interfaces/interfaces'
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UsersActions.updateUserStatusSuccess, (state, { userId, isOnline }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === userId ? { ...user, isOnline } : user
    ),
  })),
  on(UsersActions.addUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
  }))
);
