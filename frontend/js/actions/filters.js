/**
 * Created by chan on 11/23/16.
 */
import ActionTypes from '../constants/ActionTypes';

export function updateFilter(filter) {
    return { type: ActionTypes.FILTER_UPDATE, filter };
}

export function resetFilter() {
    return { type: ActionTypes.FILTER_RESET };
}