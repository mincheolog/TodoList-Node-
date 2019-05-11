import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {

        if (this.props == undefined) {
            throw new Error("TodoItemList error");
        }

        const { todos, edit_input, onToggle, onRemove, onEditChange, onSave, onEditCancel } = this.props;

        const todoList = todos.map(
            ({id, start_time, end_time, text, checked}) => (
                <TodoItem
                    id={id}
                    start_time={start_time}
                    end_time={end_time}
                    text={text}
                    edit_input={edit_input}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    onEditChange={onEditChange}
                    onSave={onSave}
                    onEditCancel={onEditCancel}
                    key={id}
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;