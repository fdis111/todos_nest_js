import { Injectable } from '@nestjs/common';
import { TodoDTO } from './data_transformers_objects/todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todo: Todo[] = [
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
        return this.todo;
    }

    create(todo: TodoDTO){
        const newTodo: Todo = {
            id: Date.now(),
            title: todo.title,
            done: todo.done,
            description: todo.description,
        }
        this.todo = [...this.todo, newTodo];
    }
}
