import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { assign } from 'lodash';

import * as shared from '../../actions/shared.action';
import { ServiceDto } from '../../../../../common/models/service.model';

export interface State extends EntityState<ServiceDto> {
  serviceSelectedId: number | null;
  serviceTotal: number;
}

export const adapter: EntityAdapter<ServiceDto> = createEntityAdapter<ServiceDto>({
  selectId: (s: ServiceDto) => s.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
  serviceSelectedId: null,
  serviceTotal: null
});

export function reducer(state = initialState, action: shared.Actions): State {
  switch (action.type) {
    case shared.SERVICE_LIST_SUCCESS: {
      return assign({}, state, adapter.addAll(action.payload.list, state), {serviceTotal: action.payload.total});
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

export const getServiceSelectedId = (state: State) => state.serviceSelectedId;
export const getServiceTotal = (state: State) => state.serviceTotal;
