import React, { Component } from 'react';
import Appbar from './layout/Appbar';
import Footer from './layout/footer';
import { Main, Notice, NotFound } from './pages';
import Store from './store/StateStore';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page_name : 'TodoList',
      current_page : <Main/>
    };
  }
  hrefPage = (page_name) => {
    let next_page = {};
    switch (page_name) {
      case 'TodoList':
        next_page = <Main/>;
        break;
      case 'Notice':
        next_page = <Notice/>;
        break;
      case 'Re_render':
        next_page = "";
        break;
      default:
        next_page = <NotFound/>;
        break;
    }
    this.setState({
      page_name : page_name,
      current_page : next_page
    });
  };
  SyncTodo = (Todos) => {
    Store.state.Todos = Todos;
  };
  render(){
    return(
        <React.Fragment>
          <Appbar hrefAction = {this.hrefPage} SyncTodo = {this.SyncTodo}/>
          { this.state.current_page }
          <Footer/>
        </React.Fragment>
    );
  }
}
