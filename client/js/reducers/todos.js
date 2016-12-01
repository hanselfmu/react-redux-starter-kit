/**
 * Created by chan on 11/23/16.
 *
 * The state shape is:
 * {
 *  todos: {
 *      1: {
 *          text: 'item 1'
 *      },
 *      2: {
 *          text: 'item 2'
 *      }
 *  },
 *  size: 2
 * }
 *
 * We recommend writing your basic state structure somewhere, e.g. above, or in an overall doc.
 * This way people new the project can catch up fairly quickly.
 */
import { handleAction, combineActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

// const addTodo = handleAction(ActionTypes.ADD_TODO, (state = { todos: [] }, action) => ({
//     ...state,
//     todos: [...state.todos, action.payload]
// }), []);

const addTodo = handleAction(ActionTypes.ADD_TODO, {
    next(state, action) {
        console.log("adding")
    },
    throw(state, action) {
        console.log("throwing");
    }
}, []);

const getTodos = handleAction(ActionTypes.GET_TODOS, {
    next(state, action) {
        return {
            ...state,

        };
    },
    throw(state, action) {
        console.log("throwing!");
        return {

        };

    }
}, []);

export default handleAction(combineActions(addTodo, getTodos), {}, {});
