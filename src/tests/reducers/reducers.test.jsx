import expect from 'expect';
import * as reducers from 'reducers';
import {default as df}  from 'deep-freeze-strict';

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc123',
          text: 'Walk the dog',
          completed: false,
          createdAt: 9456489
        }
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should update todo', () => {
      var todoData = [{
        id: 11,
        text: 'Test features',
        completed: true,
        createdAt: 0,
        completedAt: 154
      }];
      var updates = { completed: false, completedAt: null}
      var action = {
        type: "UPDATE_TODO",
        id: todoData[0].id,
        updates
      };
      var res = reducers.todosReducer(df(todoData), df(action));

      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todoData[0].text);
    });

    it('should add existing todos', () => {
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
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0]).toEqual(todos[0]);
    });

    it('should wipe todos on logout', () => {
      var todos = [{
        id: 13,
        text: 'Anything',
        completed: false,
        completedAt: undefined,
        createAt: 46547
      }]
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toBe(0);
    });

  });

  describe('authReducer', () => {
    it('should set user uid on Login', () => {
      var action = {
        type: "LOGIN",
        uid: 23
      };
      var res = reducers.authReducer(df({}), df(action));

      expect(res.uid).toEqual(action.uid);
    });

    it('should remove user uid on Logout', () => {
      var auth = {uid: 23};
      var action = {
        type: "LOGOUT"
      };
      var res = reducers.authReducer(df(auth), df(action));

      expect(res).toEqual({});
    });
  });
});
