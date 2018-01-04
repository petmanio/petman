import { assign } from 'lodash';

import * as lostFound from '../../actions/lost-found.action';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: lostFound.Actions): State {
  switch (action.type) {
    case lostFound.LIST:
    case lostFound.MORE: {
      return assign({}, state, { error: null, pending: true });
    }

    case lostFound.LIST_SUCCESS:
    case lostFound.MORE_SUCCESS: {
      return assign({}, state, { error: null, pending: false });
    }

    case lostFound.LIST_FAILURE:
    case lostFound.MORE_FAILURE: {
      return assign({}, state, { error: action.payload, pending: false });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
