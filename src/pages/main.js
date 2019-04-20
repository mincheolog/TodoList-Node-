import React, { Component } from 'react';
import TodoListTemplate from '../components/TodoListTemplate';
import Form from '../components/Form';
import DateForm from '../components/DateForm';
import TodoItemList from '../components/TodoItemList';
import axios from 'axios';
import Store from '../store/StateStore';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.id = Store.state.Todo_id;
        this.state = {
            input: '',
            current_date : '',
            todos: Store.state.Todos,
            user : Store.user_info.LoginUser
        };
        console.log(Store.user_info);

        console.log(Store.state)
    };

    handleSyncTodos = (item, user) => {
        this.setState({
            todos: item,
            user : user
        });
        Store.state.Todos = item;
        Store.user_info.name = user;
    };

    handleSearchTodoList = () => {
        let now_selected_date = this.state.current_date;
        let user_name = this.state.user;
        console.log(now_selected_date);
        axios.get('/searchlist', {
            params : {
                username : user_name,
                selected_date : now_selected_date
            }
        }).then(res => {
            if(res.data.status === 200 && res.data.data == "date or user is not defined"){
                console.log(res)
            } else {
                console.log(res)
            }
        }).catch(res => {
            console.log(res);
        })
    };

    handleSetDate = (date) => {
        this.setState({
            current_date : date
        })
    };

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    };

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '',

            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
        console.log(this.state)
    };

    handleKeyPress = (e) => {

        if(e.key === 'Enter') {
            this.handleCreate();
        }
    };

    handleToggle = (id) => {
        const { todos } = this.state;


        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];

        const nextTodos = [...todos];


        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    };

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    };

    render() {
        const { input, todos } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleSyncTodos,
            handleSetDate
        } = this;

        Store.state.Todos = this.state.todos;
        Store.state.Todo_id = this.id;

        if(this.state.todos !== Store.state.Todos){
            this.forceUpdate();
        }

        return (
            <React.Fragment>
                <TodoListTemplate
                    onSearch={this.handleSearchTodoList}
                    date_form={(
                        <DateForm
                            onSetDate={handleSetDate}
                        />
                    )}
                    form={(
                        <Form
                            value={input}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                            onCreate={handleCreate}
                        />
                    )}
                >
                    <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                </TodoListTemplate>
            </React.Fragment>
        );
    }
}