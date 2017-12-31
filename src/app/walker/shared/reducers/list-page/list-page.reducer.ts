import { assign } from 'lodash';

import * as walker from '../../actions/walker.action';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: walker.Actions): State {
  switch (action.type) {
    case walker.LIST:
    case walker.MORE: {
      return assign({}, state, { error: null, pending: true });
    }

    case walker.LIST_SUCCESS:
    case walker.MORE_SUCCESS: {
      return assign({}, state, { error: null, pending: false });
    }

    case walker.LIST_FAILURE:
    case walker.MORE_FAILURE: {
      return assign({}, state, { error: action.payload, pending: false });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
