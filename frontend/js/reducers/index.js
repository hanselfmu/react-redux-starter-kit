/**
 * Created by chan on 11/23/16.
 */
import { combineReducers } from 'redux';
import todos from './todos';
import filters from './filters';

const rootReducer = combineReducers({
    todos,
    filters
});

export default rootReducer;