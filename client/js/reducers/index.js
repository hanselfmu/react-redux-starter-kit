/**
 * Created by chan on 11/23/16.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todos from './todos';
import filters from './filters';

const rootReducer = combineReducers({
    todos,
    filters,
    routing: routerReducer
});

export default rootReducer;
