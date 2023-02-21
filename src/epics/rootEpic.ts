import { combineEpics } from 'redux-observable';
import { TodoEpic } from './todoEpic';
import { container } from 'tsyringe';

const todoEpic = container.resolve(TodoEpic);

const rootEpic = combineEpics(todoEpic.getTodosEpic, todoEpic.addTodoEpic, todoEpic.toggleTodoEpic, todoEpic.deleteTodoEpic, todoEpic.setLoadingEpic, todoEpic.setErrorEpic);

export default rootEpic;
