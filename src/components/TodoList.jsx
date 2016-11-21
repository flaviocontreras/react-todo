import React from 'react';
import Todo from 'Todo';
import {connect} from 'react-redux';

export var TodoList = React.createClass({
  render(){
    var {todos} = this.props;

    var renderTodos = () => {
        if(todos.length === 0){
          return (
            <p className="container__message">Nothing to do</p>
          );
        }
        return todos.map((todo) => {
          return <Todo key={todo.id} {...todo} />
        });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

export default connect(
  // Ao realizar o connect, passando o todos como state.todos,
  // faço com que this.props possua uma prop todos.
  (state) => {
    return {
      todos: state.todos
    };
  }
)(TodoList);
