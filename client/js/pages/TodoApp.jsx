/**
 * Created by chan on 11/24/16.
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TodoCreator from '../containers/TodoCreator';
import TodoList from '../components/todo/TodoList';

class TodoApp extends Component {
    componentDidMount() {
        this.props.dispatch(getTodos());
    }

    render() {
        const props = this.props;

        return (
            <div>
                <Header />
                <main>
                    <TodoCreator />
                    <TodoList todoList={props.todos} />
                </main>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.data || {}
});

export default connect(mapStateToProps)(TodoApp);