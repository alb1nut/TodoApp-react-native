import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { todoReducer } from './reducers/todoReducer';
import { rootEpic } from './epics/rootEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
