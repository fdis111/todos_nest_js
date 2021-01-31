import { IsNotEmpty, IsBoolean, IsString, IsDefined } from 'class-validator';

export class CreateTodoDTO{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsBoolean()
    done: boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description?: string;
}