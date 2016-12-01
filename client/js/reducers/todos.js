/**
 * Created by chan on 11/23/16.
 *
 * The state shape is:
 * {
 *  todos: {
 *      1: {
 *          text: 'item 1',
 *          status: 'initial'
 *      },
 *      2: {
 *          text: 'item 2',
 *          status: 'completed'
 *      }
 *  },
 *  size: 2,
 *  nextId: 3
 * }
 *
 * We recommend writing your basic state structure somewhere, e.g. above, or in an overall doc.
 * This way people new the project can catch up fairly quickly.
 */
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

const defaultState = {
    data: {},
    size: 0,
    nextId: 0
}

export default handleActions({
    [ActionTypes.ADD_TODO]: (state, action) => {
        const payload = action.payload;

        return {
            data: {
                ...state.data,
                [state.nextId]: {
                    text: payload.text,
                    status: 'initial'
                }
            },
            size: state.size + 1,
            nextId: state.nextId + 1
        }
    },

    [ActionTypes.GET_TODO]: (state, action) => ({
        ...state,
        payload: action.payload
    }),

    [ActionTypes.RECEIVE_TODOS]: (state, action) => {
        const payload = action.payload;

        return {
            ...payload,
            size: Object.keys(payload.data).length
        }
    }

}, defaultState);