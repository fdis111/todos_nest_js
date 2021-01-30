import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
    todo = [
        {
            id: 1,
            title: "learn to code",
            description: "A simple todo"
        },
        {
            id: 2,
            title: "Manage my files",
            description: "Manage files and folders in my pc"
        }
    ]

    findAll(): any[] {
        return this.todo;
    }
}
