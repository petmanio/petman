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
    case adopt.CREATE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case adopt.CREATE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case adopt.CREATE_FAILURE: {
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
