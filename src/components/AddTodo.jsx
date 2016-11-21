import React from 'react';
import {connect} from 'react-redux';
import {startAddTodo} from 'actions';

export var AddTodo = React.createClass({
  handleSubmit(e){
    e.preventDefault();
    var {dispatch} = this.props;

    var text = this.refs.todoText.value.trim();
    if (text.length > 0) {
      this.refs.todoText.value = '';
      dispatch(startAddTodo(text));
    } else {
      this.refs.todoText.focus();
    }
  },
  render(){
    return (
      <div className='container__footer'>
        <form ref="form" onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
