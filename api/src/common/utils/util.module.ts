import { Module, Global } from '@nestjs/common';
import { ObjectHelper } from './object.helper';

@Global()
@Module({
    providers: [ObjectHelper],
    exports: [ObjectHelper],
})
export class UtilModule { }