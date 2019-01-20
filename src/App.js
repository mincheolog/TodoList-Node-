import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Appbar from './layout/Appbar.js';

class App extends Component {

  constructor(props){
    super(props);
    this.id = 3;
    this.state = {
      input: '',
      todos: [
          { id: 0, text: 'test', checked: false },
          { id: 1, text: 'test1', checked: true },
          { id: 2, text: 'test2', checked: false },
      ]
    }
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
      handleRemove
    } = this;

    return (
        <React.Fragment>
          <Appbar/>
          <TodoListTemplate form={(
              <Form
                 value={input}
                 onKeyPress={handleKeyPress}
                 onChange={handleChange}
                 onCreate={handleCreate}
              />
          )}>
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
          </TodoListTemplate>
        </React.Fragment>
    );
  }
}

export default App;