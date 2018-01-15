import { assign } from 'lodash';

import * as organization from '../../../../organization/shared/actions/organization.action';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: organization.Actions): State {
  switch (action.type) {
    case organization.LIST:
    case organization.MORE: {
      return assign({}, state, { error: null, pending: true });
    }

    case organization.LIST_SUCCESS:
    case organization.MORE_SUCCESS: {
      return assign({}, state, { error: null, pending: false });
    }

    case organization.LIST_FAILURE:
    case organization.MORE_FAILURE: {
      return assign({}, state, { error: action.payload, pending: false });
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
