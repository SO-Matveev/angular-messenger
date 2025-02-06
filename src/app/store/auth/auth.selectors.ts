import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
