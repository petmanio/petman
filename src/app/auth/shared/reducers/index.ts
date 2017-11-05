import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../core/shared/reducers';
import * as fromAuth from './auth/auth.reducer';
import * as fromLoginPage from './login-page/login-page';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(selectAuthState, (state: AuthState) => state.status);
export const getLoggedIn = createSelector(selectAuthStatusState, fromAuth.getLoggedIn);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getSelectedUser = createSelector(selectAuthStatusState, fromAuth.getSelectedUser);

export const selectLoginPageState = createSelector(selectAuthState, (state: AuthState) => state.loginPage);
export const getLoginPageError = createSelector(selectLoginPageState, fromLoginPage.getError);
export const getLoginPagePending = createSelector(selectLoginPageState, fromLoginPage.getPending);
