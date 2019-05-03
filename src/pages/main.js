import React, { Component } from 'react';
import TodoListTemplate from '../components/TodoListTemplate';
import Form from '../components/Form';
import DateForm from '../components/DateForm';
import TodoItemList from '../components/TodoItemList';
import axios from 'axios';
import Store from '../store/StateStore';
import ItemCheckDialog from '../components/ItemCheckDialog';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.id = Store.state.Todo_id;
        this.state = {
            input: '',
            current_date : '',
            edit_input: '',
            save_id: 0,
            alert_open: false,
            todos: Store.state.Todos,
            user : Store.user_info.LoginUser
        };
    }

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

    handleEditChange = (e) => {
        this.setState({
            edit_input: e.target.value
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
    };

    handleKeyPress = (e, edit_mode, id) => {
        if(e.key === 'Enter' && !edit_mode) {
            this.handleCreate();
        } else {
            this.handleSave(id)
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

    handleConfirm = (id) => {
        const { edit_input, todos } = this.state;

        const target_item = todos.findIndex(todo => todo.id === id);
        const selected = todos[target_item];

        const next_items = [...todos];

        next_items[target_item] = {
            ...selected,
            text: edit_input,
            checked: false
        };

        this.setState({
            edit_input: '',
            todos: next_items
        });
    };

    handleSave = (id) => {
        if(this.state.edit_input.length === 0) {
            this.handleDialogOpen(id);
        } else {
            this.handleConfirm(id);
        }
    };

    handleEditCancel = () => {
        let alert_open_status = this.state.alert_open;

        if(alert_open_status === true) {
            this.setState({
                edit_input: '',
                save_id: '',
                alert_open: false
            })
        } else {
            this.setState({
                edit_input: '',
                save_id: ''
            })
        }
    };

    handleDialogOpen = (id) => {
        this.setState({
            alert_open: true,
            save_id: id
        });
    };

    handleDialogClose = (flg) => {
        if(flg === 1) {
            let id = this.state.save_id;

            this.handleConfirm(id);
            this.setState({
                alert_open: false,
                save_id: ''
            });
        } else {
            this.handleEditCancel();
        }
    };

    render() {
        const { input, todos, edit_input, alert_open } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleSetDate,
            handleSave,
            handleEditChange,
            handleEditCancel,
            handleDialogClose
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
                    <TodoItemList
                        todos={todos}
                        value={edit_input}
                        onToggle={handleToggle}
                        onRemove={handleRemove}
                        onEditChange={handleEditChange}
                        onSave={handleSave}
                        onEditCancel={handleEditCancel}
                    />
                </TodoListTemplate>
                <ItemCheckDialog
                    open_status={alert_open}
                    onAlertClose={handleDialogClose}
                />
            </React.Fragment>
        );
    }
}