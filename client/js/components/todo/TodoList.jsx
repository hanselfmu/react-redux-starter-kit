/**
 * Created by chan on 11/24/16.
 */
import Todo from './Todo';

function TodoList({ todoList }) {
    return (
        <ul>
            {Object.keys(todoList).map(id =>
                <Todo todo={todoList[id]} />
            )}
        </ul>
    )
}

export default TodoList;