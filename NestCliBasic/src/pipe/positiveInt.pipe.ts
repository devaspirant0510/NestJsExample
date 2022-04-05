import {ArgumentMetadata, HttpException, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform{
    transform(value: number, metadata: ArgumentMetadata): number {
        if(value<0){
            throw new HttpException("value is 0 < x",401)
        }
        return value
    }

}