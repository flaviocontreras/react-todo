import React from 'react';
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';

var TodoApp = React.createClass({
  getInitialState(){
    return {
      todos: [
        {
          id: 1,
          text: 'Walk the dog'
        },
        {
          id: 2,
          text: 'Clean the yard'
        },
        {
          id: 3,
          text: 'Learn React'
        },
        {
          id: 4,
          text: 'Create some awesome apps'
        }
      ]
    };
  },
  handleAddTodo(text){
    var todos = [
      ...this.state.todos,
      {
        id: this.state.todos.length+1,
        text: text
      }
    ];
    this.setState({todos});
  },
  render(){
    var {todos} = this.state;

    return (
      <div>
        <TodoList todos={todos}/>
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    );
  }
});

export default TodoApp;
