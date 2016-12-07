/**
 * Created by chan on 11/24/16.
 */

import todoStyle from '../../../style/components/todo/todo.scss';

console.log(todoStyle);

function Todo({ todo }) {
    return (
        <li className={todoStyle.todo}>
            {`${todo.text}: ${todo.status}`}
        </li>
    )
}

export default Todo;