import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

// Создаем feature selector для состояния пользователей
export const selectUsersFeature = createFeatureSelector<UsersState>('users');

// Селектор для получения всех пользователей
export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);
