import * as auth from '../../actions/auth.action';
import { UserDto } from '../../../../../../common/models/user.model';

export interface State {
  loggedIn: boolean;
  user: UserDto | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.FB_LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case auth.USER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
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
