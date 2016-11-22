import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {startToggleTodo} from 'actions';


// Exportando diretamente, para que nos testes não seja necessario criar uma store
export var Todo = React.createClass({
  render(){
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;
      if (completed){
        message = 'Completed ';
        timestamp = completedAt;
      }

      return `${message}${moment.unix(timestamp).format('MMM Do Y @ HH:mm a')}`
    };

    return (
      <div className={todoClassName} onClick={() => {
          //this.props.onToggle(id);
          dispatch(startToggleTodo(id, !completed));
        }}>
        <div>
            <input type="checkbox" checked={completed} readOnly/>
        </div>
        <div>
          <p>{text}</p>
          <p className='todo__subtext'>{renderDate()}</p>
        </div>
      </div>
    );
  }
});
// Ao executar connect, o método dispatch fica disponível em props
export default connect()(Todo);
