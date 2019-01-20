import React from 'react';
import '../css/TodoListTemplate.css';

const TodoListTemplate = ({form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title">
                TodoList
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                { children }
            </section>
        </main>
    );
};

export default TodoListTemplate;