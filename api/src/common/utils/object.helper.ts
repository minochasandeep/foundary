import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjectHelper {
    deepMerge(target: any, source: any): any {
        if (typeof target !== 'object' || typeof source !== 'object') {
            return source;
        }

        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], this.deepMerge(target[key], source[key]));
                }
            }
        }

        Object.assign(target || {}, source);
        return target;
    }
}