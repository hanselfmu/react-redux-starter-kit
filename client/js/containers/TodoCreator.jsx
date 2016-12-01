/**
 * Created by chan on 11/24/16.
 */
import { Component }  from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

class TodoCreator extends Component {
    constructor(props) {
        super(props);

        this.input = '';
    }

    render() {
        return (
            <form onSubmit={e => {
                e.preventDefault();
                const text = this.input.value.trim();
                if (text) {
                    this.props.dispatch(addTodo(text));
                    this.input.value = '';
                }
            }}>
                <input ref={node => {
                    this.input = node;
                }} />
                <button type="submit">Add Todo Locally</button>
            </form>
        )
    }
}

export default connect()(TodoCreator);
