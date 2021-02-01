import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDTO } from './data_transfer_objects/create_todo.dto';
import { ITodo } from './interfaces/todo.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Types, isValidObjectId } from 'mongoose';
 
@Injectable()
export class TodosService {
    todos: ITodo[] = [
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

    constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>){}

    private convertStrToIdObj(id: string): Types.ObjectId{
        if (isValidObjectId(id)) {
            return Types.ObjectId(id)
        }
        throw new HttpException('the id passed as parameter is incorrect', HttpStatus.BAD_REQUEST);
    }

    findAll(): Promise<ITodo[]> {
        return this.TodoModel.find().exec();
    }

    async create(todo: CreateTodoDTO){
        const createdTodo = new this.TodoModel(todo);
        createdTodo.save();
    }

    findById(id: string): Promise<ITodo>{
        const _id = this.convertStrToIdObj(id);
        return  this.TodoModel.findById({_id}).exec();
    }

    async update(todo: CreateTodoDTO, id: string){
        const result = await this.TodoModel.updateOne({
            _id : this.convertStrToIdObj(id)
        },
        {
            title: todo.title,
            description: todo.description,
            done: todo.done,
            updatedAt: new Date,
        })
        return result;
    }

    delete(id: string){
       return this.TodoModel.deleteOne({ _id: this.convertStrToIdObj(id)})
    }
}
