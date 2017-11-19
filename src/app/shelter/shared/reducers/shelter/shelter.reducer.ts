import * as shelter from '../../actions/shelter.action';

export interface State {
  entities: any;
}

export const initialState: State = {
  entities: {}
};

export function reducer(state = initialState, action: shelter.Actions): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
