/**
 * Created by chan on 12/1/16.
 *
 * This middleware transforms a flux standard action
 * with payload = function(dispatch) to a function
 */
import { isFSA } from 'flux-standard-action';

const reduxFSAThunk = store => next => action => {
    if (isFSA(action) && typeof action.payload === 'function') {
        return action.payload(store.dispatch, store.getState);
    } else {
        return next(action);
    }
}

export default reduxFSAThunk;