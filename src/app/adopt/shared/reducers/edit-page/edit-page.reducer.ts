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
    case adopt.UPDATE:
    case adopt.DELETE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case adopt.UPDATE_SUCCESS:
    case adopt.DELETE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case adopt.UPDATE_FAILURE:
    case adopt.DELETE_FAILURE: {
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
