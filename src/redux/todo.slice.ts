import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Todo } from '../models/todo';
import { RootState } from './store';
// import { TodoService } from '../services/todoService';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/TodoService';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchTodosStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    completeTodo: (state, action: PayloadAction<{ id: number }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        TodoService.updateTodo(todo);
      }
    },
    // ...other reducers
  },
});

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectLoading = (state: RootState) => state.todo.loading;
export const selectError = (state: RootState) => state.todo.error;

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
