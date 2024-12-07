import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable({ scope: Scope.DEFAULT })
export default class CacheService {

    constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    }

    async get<T>(key: string): Promise<T> {
        return this.cache.get<T>(key);
    }

    async getOrAdd<T>(key: string, func: () => Promise<T>, ttl?: number): Promise<T> {
        const cachedValue = await this.cache.get<T>(key);
        if (cachedValue) {
            return cachedValue;
        } else {
            const result = await func();
            await this.cache.set(key, result, ttl);
            return result;
        }
    }

    async add(key: string, value: any, ttl?: number): Promise<void> {
        return this.cache.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        return this.cache.del(key);
    }

    async clear(): Promise<void> {
        return this.cache.reset();
    }

    async getKeys(prefix?: string): Promise<string[]> {
        return this.cache.store.keys(prefix);
    }
}