/**
 * Created by chan on 11/24/16.
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions';
import AddTodo from '../containers/AddTodo';
import TodoList from '../components/todo/TodoList';

class TodoApp extends Component {
    componentDidMount() {
        //const dispatch = this.props.dispatch;
        //console.log(dispatch(getTodos()));
    }

    render() {
        const props = this.props;

        return (
            <div>
                <AddTodo />
                <TodoList todoList={props.todos}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.data || {}
});

export default connect(mapStateToProps)(TodoApp);