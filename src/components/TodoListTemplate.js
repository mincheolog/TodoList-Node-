import React from 'react';
import '../css/TodoListTemplate.css';

const TodoListTemplate = ({DateForm, form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title">
                TodoList
            </div>
            { DateForm }
            <section className="form-wrapper">
                { form }
            </section>
            <section className="todos-wrapper">
                { children }
            </section>
        </main>
    );
};

export default TodoListTemplate;