/**
 * Created by chan on 11/24/16.
 */
function Todo({ todo }) {
    return (
        <li>{`${todo.text}: ${todo.status}`}</li>
    )
}

export default Todo;