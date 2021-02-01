export interface ITodo{
    id: number;
    title: string;
    done: boolean;
    description?: string;
    createdAt?: Date,
    updatedAt?: Date 
}