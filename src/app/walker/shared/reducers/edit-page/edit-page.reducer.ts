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
    case walker.UPDATE:
    case walker.DELETE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case walker.UPDATE_SUCCESS:
    case walker.DELETE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case walker.UPDATE_FAILURE:
    case walker.DELETE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
