import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDTO } from './data_transformers_objects/create_todo.dto';
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

    create(todo: CreateTodoDTO){
        const newTodo: Todo = {
            id: Date.now(),
            title: todo.title,
            done: todo.done,
            description: todo.description,
        }
        this.todo = [...this.todo, newTodo];
    }

    findById(id: number): Todo{
        const result = this.todo.find(todo => todo.id === id);
        if(result){
            return result;
        }
        throw new HttpException(`To do with id : ${id} not exists`, HttpStatus.NOT_FOUND);
    }
}
