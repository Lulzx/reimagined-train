import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() createTodo: Omit<Todo, 'id'>): Todo {
    return this.todoService.create(createTodo);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodo: Partial<Todo>): Todo {
    return this.todoService.update(id, updateTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    return this.todoService.remove(id);
  }
}
