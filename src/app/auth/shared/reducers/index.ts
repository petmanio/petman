import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/reducers';
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

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthStatusState = createSelector(getAuthState, (state: AuthState) => state.status);
export const getLoggedIn = createSelector(getAuthStatusState, fromAuth.getLoggedIn);
export const getUser = createSelector(getAuthStatusState, fromAuth.getUser);
export const getSelectedUser = createSelector(getAuthStatusState, fromAuth.getSelectedUser);

export const getLoginPageState = createSelector(getAuthState, (state: AuthState) => state.loginPage);
export const getLoginPageError = createSelector(getLoginPageState, fromLoginPage.getError);
export const getLoginPagePending = createSelector(getLoginPageState, fromLoginPage.getPending);
