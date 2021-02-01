import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import config  from './config/config';

@Module({
    imports: [
      TodosModule, 
      ConfigModule.forRoot({load: [config]}), 
      MongooseModule.forRoot(process.env.DATABASE_URI)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
