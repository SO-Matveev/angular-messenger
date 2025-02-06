import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

// Создаем feature selector для состояния пользователей
export const selectUsersFeature = createFeatureSelector<UsersState>('users');

// Селектор для получения всех пользователей
export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

// Селектор для онлайн пользователей
export const selectOnlineUsers = createSelector(
  selectUsers,
  (users) => users.filter((user) => user.is_online)
);

// Селектор для оффлайн пользователей
export const selectOfflineUsers = createSelector(
  selectUsers,
  (users) => users.filter((user) => !user.is_online)
);
