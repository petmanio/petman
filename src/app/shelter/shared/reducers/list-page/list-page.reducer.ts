import {assign} from 'lodash';

import * as shelter from '../../actions/shelter.action';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: shelter.Actions): State {
  switch (action.type) {
    case shelter.LIST:
    case shelter.MORE: {
      return assign({}, state, { error: null, pending: true });
    }

    case shelter.LIST_SUCCESS:
    case shelter.MORE_SUCCESS: {
      return assign({}, state, { error: null, pending: false });
    }

    case shelter.LIST_FAILURE:
    case shelter.MORE_FAILURE: {
      return assign({}, state, { error: action.payload, pending: false });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
