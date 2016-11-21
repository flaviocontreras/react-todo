import React from 'react';
import Todo from 'Todo';
import {connect} from 'react-redux';
import TodoAPI from 'TodoAPI';

export var TodoList = React.createClass({
  render(){
    var {todos, showCompleted, searchText} = this.props;

    var renderTodos = () => {
        if(todos.length === 0){
          return (
            <p className="container__message">Nothing to do</p>
          );
        }
        return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
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
    return state;
  }
)(TodoList);
