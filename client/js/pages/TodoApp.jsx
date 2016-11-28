/**
 * Created by chan on 11/24/16.
 */
import CreateTodo from '../containers/CreateTodo'
import TodoList from '../components/todo/TodoList'

function TodoApp() {
    return (
        <div>
            <CreateTodo />
            <TodoList todoList={[1, 2, 3, 4, 5]} />
        </div>
    )
}

export default TodoApp;