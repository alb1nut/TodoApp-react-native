import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { container } from 'tsyringe';
// import rootReducer from '../reducers/todoReducer';
import rootEpic from '../epics/rootEpic';
// import { rootReducer } from '..src/reducers';

const epicMiddleware = createEpicMiddleware({
  dependencies: container,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;

export default store;
