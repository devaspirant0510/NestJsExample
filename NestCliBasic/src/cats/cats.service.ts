import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    test():string{
        return "catService test";
    }
}
