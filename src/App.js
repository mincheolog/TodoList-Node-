import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
<<<<<<< HEAD
import DateForm from './components/DateForm';
import TodoItemList from './components/TodoItemList';
import Appbar from './layout/Appbar';
import Footer from "./layout/footer";
import axios from 'axios';
=======
import TodoItemList from './components/TodoItemList';
import Appbar from './layout/Appbar.js';
import Footer from "./layout/footer";
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb

class App extends Component {

  constructor(props){
    super(props);
    this.id = 3;
    this.state = {
      input: '',
<<<<<<< HEAD
      current_date : '',
=======
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
      todos: [
          { id: 0, text: 'test', checked: false },
          { id: 1, text: 'test1', checked: true },
          { id: 2, text: 'test2', checked: false },
<<<<<<< HEAD
      ],
      user : ''
    }
  };

  handleSyncTodos = (item, user) => {
    this.setState({
      todos: item,
      user : user
    })
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
=======
      ]
    }
  };

  handleSyncTodos = (item) => {
    this.setState({
      todos: item
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
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
<<<<<<< HEAD
    const { input, todos, user } = this.state;
=======
    const { input, todos } = this.state;
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
<<<<<<< HEAD
      handleRemove,
      handleSyncTodos,
      handleSetDate
=======
      handleRemove
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
    } = this;

    return (
        <React.Fragment>
<<<<<<< HEAD
          <Appbar todos={todos} setTodoitem={handleSyncTodos} user={user}/>
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
=======
          <Appbar todos={todos} setTodoitem={this.handleSyncTodos}/>
          <TodoListTemplate form={(
              <Form
                 value={input}
                 onKeyPress={handleKeyPress}
                 onChange={handleChange}
                 onCreate={handleCreate}
              />
          )}>
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
          </TodoListTemplate>
          <Footer/>
        </React.Fragment>
    );
  }
}

export default App;