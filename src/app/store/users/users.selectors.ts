import { createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = (state: { users: UsersState }) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);


export const selectOnlineUsers = createSelector(
  selectUsers,
  (users) => users.filter((user) => user.is_online)
);

export const selectOfflineUsers = createSelector(
  selectUsers,
  (users) => users.filter((user) => !user.is_online)
);
