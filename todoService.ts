import axios from 'axios';
import { Todo } from './types';

export default class TodoService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  async getTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(this.baseUrl);
    return response.data;
  }

  async addTodo(todo: Todo): Promise<Todo> {
    const response = await axios.post<Todo>(this.baseUrl, todo);
    return response.data;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    const response = await axios.put<Todo>(url, todo);
    return response.data;
  }

  async deleteTodo(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    await axios.delete(url);
  }
}
