import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
// import TodoList from '../components/TodoList';
// import { Todo } from '../models/todo';
import TodoList from '../src/components/TodoList';
import { Todo } from '../src/models/Todo';

describe('TodoList', () => {
  const todos: Todo[] = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  it('renders correctly', () => {
    const { getByText } = render(<TodoList todos={todos} />);
    expect(getByText('Todo 1')).toBeDefined();
    expect(getByText('Todo 2')).toBeDefined();
    expect(getByText('Todo 3')).toBeDefined();
  });

  it('calls the onToggleTodo prop when a todo is toggled', () => {
    const handleToggleTodo = jest.fn();
    const { getByText } = render(
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    );
    fireEvent.press(getByText('Todo 1'));
    expect(handleToggleTodo).toHaveBeenCalledWith(1);
  });

  it('calls the onDeleteTodo prop when a todo is deleted', () => {
    const handleDeleteTodo = jest.fn();
    const { getByText } = render(
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    );
    fireEvent.press(getByText('Delete'));
    expect(handleDeleteTodo).toHaveBeenCalledWith(1);
  });
});
