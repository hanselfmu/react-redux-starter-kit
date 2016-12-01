/**
 * Created by chan on 11/20/16.
 *
 * As to why this filename is PascalCase, check out
 * https://github.com/airbnb/javascript#naming--PascalCase-singleton
 *
 * Also, it is more of a convention that Flux or Redux apps put their action types
 * as constant strings in a separate "constants/ActionTypes" file, but this is losing
 * its original purpose now that we use "redux-actions" to create actions and reducers.
 *
 * Now it mainly serves as a centralized place where all the actions are defined; this way
 * we can easily see what are the actions for different models.
 */
import keymirror from 'keymirror';

export default keymirror({
    ADD_TODO: null,
    GET_TODO: null,
    GET_TODOS: null,
    UPDATE_TODO: null,
    DELETE_TODO: null,

    UPDATE_FILTER: null,
    RESET_FILTERS: null
});