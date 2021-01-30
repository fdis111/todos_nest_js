import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { validate, ValidationError} from 'class-validator';
import { plainToClass } from 'class-transformer';
@Injectable()
export class TodosPipe implements PipeTransform{

   async transform(value: any, metadata: ArgumentMetadata){
        if (this.isEmpty(value)) throw new HttpException('Validation failed: No payload provided', HttpStatus.BAD_REQUEST);

        const { metatype } = metadata;
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new HttpException(this.formateErrors(errors), HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private isEmpty(value: any): boolean {
        return Object.keys(value).length < 1 ? true : false;
    }

    private formateErrors (errors: ValidationError[]) : string {
        return errors.map(error => {
            for (const key in error.constraints) {
                return error.constraints[key];   
            }
        }).join(", ")
    }
}