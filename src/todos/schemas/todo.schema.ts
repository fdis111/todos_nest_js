import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo{
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    done: boolean;

    @Prop({
        default: new Date()
    })
    createdAt: Date;

    @Prop({
        default: new Date()
    })
    updatedAt: Date
}

export const TodoSchema = SchemaFactory.createForClass(Todo);