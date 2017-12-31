import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { assign } from 'lodash';

import * as walker from '../../actions/walker.action';
import { WalkerDto } from '../../../../../../common/models/walker.model';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<WalkerDto> {
  selectedId: number | null;
  total: number;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<WalkerDto> = createEntityAdapter<WalkerDto>({
  selectId: (s: WalkerDto) => s.id,
  sortComparer: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null
});

export function reducer(state = initialState, action: walker.Actions): State {
  switch (action.type) {
    case walker.CREATE_SUCCESS: {
      return assign({}, state, adapter.addOne(action.payload, state), {total: state.total + 1});
    }

    case walker.UPDATE_SUCCESS: {
      return assign({}, state, adapter.updateOne({ id: action.payload.id, changes: action.payload }, state));
    }

    case walker.DELETE_SUCCESS: {
      return assign({}, state, adapter.removeOne(action.payload.id, state), {total: state.total + 1});
    }

    case walker.LOAD_SUCCESS: {
      return assign({}, state, adapter.addOne(action.payload, state));
    }

    case walker.LIST_SUCCESS: {
      return assign({}, state, adapter.addAll(action.payload.list, state), {total: action.payload.total});
    }

    case walker.MORE_SUCCESS: {
      return assign({}, state, adapter.addMany(action.payload.list, state), {total: action.payload.total});
    }

    case walker.SELECT: {
      return assign({}, state, {selectedId: action.payload});
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
