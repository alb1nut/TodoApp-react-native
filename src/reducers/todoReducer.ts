import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models/Todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setTodos, setLoading, setError, addTodo, toggleTodo, deleteTodo } =
  todoSlice.actions;

export const todoReducer = todoSlice.reducer;
``
