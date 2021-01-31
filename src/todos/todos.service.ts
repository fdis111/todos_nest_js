import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDTO } from './data_transfer_objects/create_todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id: 1,
            title: "learn to code",
            description: "A simple todo",
            done: false
        },
        {
            id: 2,
            title: "Manage my files",
            description: "Manage files and folders in my pc",
            done: false
        }
    ]

    findAll(): Todo[] {
        return this.todos;
    }

    create(todo: CreateTodoDTO){
        const newTodo: Todo = {
            id: Date.now(),
            title: todo.title,
            done: todo.done,
            description: todo.description,
        }
        this.todos = [...this.todos, newTodo];
    }

    findById(id: number): Todo{
        const result = this.todos.find(todo => todo.id === id);
        if(result){
            return result;
        }
        throw new NotFoundException(`To do with id : ${id} not exists`);
    }

    update(todo: CreateTodoDTO, id: number): Todo{
        const todoIndex = this.todos.findIndex(_todo => _todo.id === id);
        if (todoIndex >= 0) {
            this.todos[todoIndex].title = todo.title;
            this.todos[todoIndex].description = todo.description;
            this.todos[todoIndex].done = todo.done;
            return this.todos[todoIndex];
        }
        throw new NotFoundException(`Todo with id ${id} do not exists`);
    }

    delete(id: number){
        const rowToDelete = this.todos.find(_todo => _todo.id === id)
        this.todos = this.todos.filter(todo => todo.id !== id);
        return {deletedRow : rowToDelete}
    }
}
