import { assign } from 'lodash';

import * as adopt from '../../actions/adopt.action';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: adopt.Actions): State {
  switch (action.type) {
    case adopt.LIST:
    case adopt.MORE: {
      return assign({}, state, { error: null, pending: true });
    }

    case adopt.LIST_SUCCESS:
    case adopt.MORE_SUCCESS: {
      return assign({}, state, { error: null, pending: false });
    }

    case adopt.LIST_FAILURE:
    case adopt.MORE_FAILURE: {
      return assign({}, state, { error: action.payload, pending: false });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
