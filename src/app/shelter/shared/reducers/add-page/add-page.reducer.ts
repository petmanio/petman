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
    case shelter.CREATE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case shelter.CREATE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case shelter.CREATE_FAILURE: {
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
