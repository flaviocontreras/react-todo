import React from 'react';

var AddTodo = React.createClass({
  handleSubmit(e){
    e.preventDefault();

    var text = this.refs.todoText.value.trim();
    if (text.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(text);
    } else {
      this.refs.todoText.focus();
    }
  },
  render(){
    return (
      <div>
        <form ref="form" onSubmit={this.handleSubmit}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default AddTodo;
