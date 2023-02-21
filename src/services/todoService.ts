import { injectable } from 'tsyringe';
import axios from 'axios';
import { Todo } from '../models/Todo';
import { WritableDraft } from 'immer/dist/internal';

@injectable()
export class TodoService {
  static updateTodo(todo: WritableDraft<Todo>) {
      throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos() {
    return axios.get(this.apiUrl);
  }

  addTodo(todo: Todo) {
    return axios.post(this.apiUrl, todo);
  }

  toggleTodo(id: number) {
    return axios.patch(`${this.apiUrl}/${id}`, { completed: true });
  }

  deleteTodo(id: number) {
    return axios.delete(`${this.apiUrl}/${id}`);
  }
}
