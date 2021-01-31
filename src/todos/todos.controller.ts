import { Body, Controller, Get, Post, UsePipes, Param, ParseIntPipe} from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './data_transformers_objects/create_todo.dto';
import { TodosPipe } from './pipes/todos.pipe';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService){}

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.todosService.findById(id);
    }

    @Post()
    @UsePipes(TodosPipe)
    createTodo(@Body() newTodo: CreateTodoDTO): void{
        return this.todosService.create(newTodo);
    }
}
 