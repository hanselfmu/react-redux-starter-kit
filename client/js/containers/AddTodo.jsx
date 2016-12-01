/**
 * Created by chan on 11/24/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let CreateTodo = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
                <input ref={node => {
          input = node
        }} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

CreateTodo = connect()(CreateTodo)

export default CreateTodo
