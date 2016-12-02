/**
 * Created by chan on 11/24/16.
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, saveTodos } from '../actions';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TodoCreator from '../containers/TodoCreator';
import TodoList from '../components/todo/TodoList';

class TodoApp extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        const props = this.props;

        return (
            <div>
                <Header />
                <main>
                    <TodoCreator />
                    <TodoList todoList={props.todos.data} />
                    <div>
                        <button onClick={() => { props.saveToServer(props.todos) }}>save updates to server</button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos || {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTodos: () => { dispatch(getTodos()) },
    saveToServer: (todos) => { dispatch(saveTodos(todos)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);