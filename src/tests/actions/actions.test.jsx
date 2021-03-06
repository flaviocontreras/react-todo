import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import expect from 'expect';
import * as actions from 'actions';
import firebase, {firebaseRef} from 'app/firebase/index';

var createMockStore = configureMockStore([ReduxThunk]);

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
      todo: {
        id: '123abc',
        text: 'Learn Redux',
        completed: false,
        createAt: 0
      }
    };
    var res = actions.addTodo(action.todo);

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

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 5,
      updates: { completed:false }
    };
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate login action', () => {
    var uid = 457
    var action = {
      type: "LOGIN",
      uid
    };
    var res = actions.login(uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action', () => {
    var action = {
      type: "LOGOUT"
    };
    var res = actions.logout();

    expect(res).toEqual(action);
  });

  describe('tests with firebase todos', () => {
    var testTodoRef;
    var uid;
    var todosRef;

    beforeEach((done) => {
      firebase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        todosRef = firebaseRef.child(`users/${uid}/todos`);
        // Retornando após remover, para conseguir encadear o próximo 'then', após remover os dados
        return todosRef.remove();
      }).then(() => {
        testTodoRef = todosRef.push();

        return testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 23453453
        });
      })
      .then(() => done())
      .catch(done);

    });

    afterEach((done) => {
      todosRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key,
        });

        expect(mockActions[0].updates).toInclude({
          completed: true
        });

        expect(mockActions[0].updates.completedAt).toBeA('number');
        done();
      }, done);

    });

    it('should populate todos and dispatch ADD_TODOS action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toBe(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');
        done();

      }, done);

    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'My todo item';

      store.dispatch(actions.startAddTodo(todoText)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();

      }).catch(done);

    });

  });


});
