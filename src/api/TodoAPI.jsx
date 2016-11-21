import $ from 'jquery';
export default {
  setTodos(todos){
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos(){
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    try {
        todos = JSON.parse(stringTodos);
    } catch (e) {

    }

    return $.isArray(todos) ? todos : [];
  },
  filterTodos(todos, showCompleted, searchText){
    searchText = searchText ? searchText.toLowerCase() : ''
    //var searchText = searchText.toLowerCase();
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      return todo.text.toLowerCase().indexOf(searchText) > -1;
    });

    // Sorto todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if ( a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }

    });

    return filteredTodos;
  }
};
