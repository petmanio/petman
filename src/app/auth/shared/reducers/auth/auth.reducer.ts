import { createSelector } from 'reselect';
import { assign, find } from 'lodash';

import { UserDto } from '@common/models/user.model';

import * as auth from '../../actions/auth.action';

export interface State {
  loggedIn: boolean;
  user: UserDto | null;
  selectedUserId: number;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  selectedUserId: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.USER_SUCCESS: {
      return assign({}, state, {
        loggedIn: true,
        user: action.payload,
      });
    }

    case auth.CHANGE_USER: {
      return assign({}, state, { selectedUserId: action.payload });
    }

    case auth.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getSelectedUser = createSelector(getUser, getSelectedUserId, (user, userId) => {
  const businessUser = find(user ? user.businessUsers : [], u => u.id === userId);
  return businessUser || user;
});
