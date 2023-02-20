// import { configureStore } from '@reduxjs/toolkit';
// import todosReducer from './todosSlice';

// const store = configureStore({
//   reducer: {
//     todos: todosReducer
//   }
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import todosReducer from './todosSlice';
// import { todosEpic } from './todosEpic';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

// epicMiddleware.run(todosEpic);
