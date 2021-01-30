import { Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';
import { TodoDTO } from './data_transformers_objects/todo.dto';
import { TodosPipe } from './pipes/todos.pipe';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService){}

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Post()
    @UsePipes(TodosPipe)
    createTodo(@Body() newTodo: TodoDTO): void{
        this.todosService.create(newTodo);
    }
}
 