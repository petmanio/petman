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
    case lostFound.CREATE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case lostFound.CREATE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case lostFound.CREATE_FAILURE: {
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
