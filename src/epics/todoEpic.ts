import { injectable } from 'tsyringe';
import { ofType } from 'redux-observable';
import { of ,pipe } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Todo } from '../models/Todo';
import { setTodos, setLoading, setError, addTodo, toggleTodo, deleteTodo } from '../reducers/todoReducer';
import { TodoService } from '../services/TodoService';
import { Epic } from 'redux-observable';
// import { pipe } from 'rxjs';


@injectable()
export class TodoEpic {
  constructor(private todoService: TodoService) {}

  getTodosEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/getTodos'),
      switchMap(() => {
        return this.todoService.getTodos().pipe(
          map((response: Todo[]) => {
            return setTodos(response);
          }),
          catchError((error) => of(setError(error.message)))
        );
      })
    );

  addTodoEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/addTodo'),
      switchMap((action) => {
        return this.todoService.addTodo(action.payload).pipe(
          map((response: Todo) => {
            return addTodo(response);
          }),
          catchError((error) => of(setError(error.message)))
        );
      })
    );

  toggleTodoEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/toggleTodo'),
      switchMap((action) => {
        return this.todoService.toggleTodo(action.payload).pipe(
          map(() => {
            return toggleTodo(action.payload);
          }),
          catchError((error) => of(setError(error.message)))
        );
      })
    );

  deleteTodoEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/deleteTodo'),
      switchMap((action) => {
        return this.todoService.deleteTodo(action.payload).pipe(
          map(() => {
            return deleteTodo(action.payload);
          }),
          catchError((error) => of(setError(error.message)))
        );
      })
    );

  setLoadingEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/getTodos', 'todo/addTodo', 'todo/toggleTodo', 'todo/deleteTodo'),
      map(() => {
        return setLoading(true);
      })
    );

  setErrorEpic: Epic = (action$) =>
    action$.pipe(
      ofType('todo/getTodos', 'todo/addTodo', 'todo/toggleTodo', 'todo/deleteTodo'),
      catchError((error) => of(setError(error.message)))
    );
}
