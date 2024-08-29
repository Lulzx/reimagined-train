import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(todo: Omit<Todo, 'id'>): Todo {
    const newTodo = { ...todo, id: this.idCounter++ };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodo: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodo);
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    this.todos.splice(index, 1);
  }
}
