import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TodoList from './src/components/TodoList';

export default function App() {
  return (
    <Provider store={store}>
      <TodoList  />
    </Provider>
  );
}
