/**
 * Created by chan on 11/24/16.
 */
import Todo from './Todo'

function TodoList({ todoList }) {
    return (
        <ul>
            {todoList.map(item => Todo(item))}
        </ul>
    )
}

export default TodoList;