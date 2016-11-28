/**
 * Created by chan on 11/23/16.
 */
import ActionTypes from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.TODO_CREATE:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text
                },
                ...state
            ];

        case ActionTypes.TODO_DELETE:
            return state.filter(todo =>
                todo.id !== action.id
            );

        case ActionTypes.TODO_UPDATE:
            return state.map(todo =>
                todo.id === action.id ?
                    Object.assign({}, todo, { text: action.text }) :
                    todo
            );

        default:
            return state
    }
}
