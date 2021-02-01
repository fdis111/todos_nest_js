import { Body, Controller, Get, Post, Put, UsePipes, Param, Delete} from '@nestjs/common';
import { ITodo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './data_transfer_objects/create_todo.dto';
import { TodosPipe } from './pipes/todos.pipe';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService){}

    @Get()
    findAll(): Promise<ITodo[]> {
        return this.todosService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string){
        return this.todosService.findById(id);
    }

    @Post()
    @UsePipes(TodosPipe)
    createTodo(@Body() newTodo: CreateTodoDTO){
        return this.todosService.create(newTodo);
    }
    
    @Put(':id')
    updateTodo(@Param('id') id: string, @Body(TodosPipe) todo:  CreateTodoDTO){
        return this.todosService.update(todo, id); 
    }

    @Delete(':id')
    deleteTodo(@Param('id') id : string) {
        return this.todosService.delete(id);
    }

}
 