import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/interfaces'

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const updateUserStatus = createAction(
  '[Users] Update User Status',
  props<{ userId: string; isOnline: boolean }>()
);
export const updateUserStatusSuccess = createAction(
  '[Users] Update User Status Success',
  props<{ userId: string; isOnline: boolean }>()
);
export const updateUserStatusFailure = createAction(
  '[Users] Update User Status Failure',
  props<{ error: any }>()
);

export const addUsers = createAction(
  '[Users] Add Users',
  props<{ users: User[] }>()
);
export const addUsersSuccess = createAction(
  '[Users] Add Users Success',
  props<{ users: User[] }>()
);
export const addUsersFailure = createAction(
  '[Users] Add Users Failure',
  props<{ error: any }>()
);
