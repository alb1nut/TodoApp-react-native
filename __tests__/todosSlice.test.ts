import { RootState } from '../store';
import todosReducer, {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
//   Todo
} from '../todosSlice';
import TodoService from '../todoService';
import { Todo } from '../types';

describe('todosSlice', () => {
  const initialState: RootState = {
    todos: {
      items: [],
    //   loading: false,
    //   error: null
    }
  };

  it('should fetch todos', async () => {
    const todoService = new TodoService();
    const todos: Todo[] = [
      { id: 1,  title: 'Test 1', completed: false },
      { id: 2, title: 'Test 2', completed: true },
      { id: 3, title: 'Test 3', completed: false }
    ];
    jest.spyOn(todoService, 'getTodos').mockResolvedValue(todos);
    const dispatch = jest.fn();
    const getState = jest.fn(() => initialState);
    // await fetchTodos()(dispatch, getState, null);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'todos/fetchTodos/pending' });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'todos/fetchTodos/fulfilled',
      payload: todos
    });
  });
  
  it('should add a new todo', () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      completed: false
    };
    const action = addTodo(todo);
    const state = todosReducer(initialState.todos, action);
    expect(state.items).toContain(todo);
  });
  
  it('should toggle a todo', () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      completed: false
    };
    const state = {
      items: [todo],
      loading: false,
      error: null
    };
    // const action = toggleTodo({
    //   id: todo.id,
    //   completed: true
    // });
    // const nextState = todosReducer(state, action);
    // expect(nextState.items[0].completed).toBe(true);
  });
  
  it('should delete a todo', () => {
    const todo: Todo = {
      id: 1,
      title: 'Test',
      completed: false
    };
    const state = {
      items: [todo],
      loading: false,
      error: null
    };
    const action = deleteTodo(todo.id);
    const nextState = todosReducer(state, action);
    expect(nextState.items).toHaveLength(0);
  });
  
})