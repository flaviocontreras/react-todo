import expect from 'expect';
import * as actions from 'actions';

describe('Actions', () => {
  it('should generate search text action', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Some search text'
      };
      var res = actions.setSearchText(action.searchText);

      expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Learn Redux'
    };
    var res = actions.addTodo(action.text);

    expect(res).toEqual(action);
  });

  it('should generate add todos action object', () => {
    var todos = [{
      id: 13,
      text: 'Anything',
      completed: false,
      completedAt: undefined,
      createAt: 46547
    }]
    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 5
    };
    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });
});
