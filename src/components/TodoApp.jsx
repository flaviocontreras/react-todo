import React from 'react';
import uuid from 'node-uuid';

// components
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import TodoAPI from 'TodoAPI';

var TodoApp = React.createClass({
  getInitialState(){
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },
  componentDidUpdate(){
    TodoAPI.setTodos(this.state.todos);
  },
  handleAddTodo(text){
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false
        }
      ]
    });
  },
  handleSearch(showCompleted, searchText){
    this.setState({
      showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleToggle(id){
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    this.setState({todos: updatedTodos});
  },
  render(){
    var {todos} = this.state;

    return (
      <div>
        <TodoSearch onSearch={this.handleSearch}/>
        <TodoList todos={todos} onToggle={this.handleToggle}/>
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    );
  }
});

export default TodoApp;
