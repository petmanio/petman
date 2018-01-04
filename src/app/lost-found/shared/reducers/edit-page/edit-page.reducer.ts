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
    case lostFound.UPDATE:
    case lostFound.DELETE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case lostFound.UPDATE_SUCCESS:
    case lostFound.DELETE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case lostFound.UPDATE_FAILURE:
    case lostFound.DELETE_FAILURE: {
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
