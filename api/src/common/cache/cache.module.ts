import { Global, Module } from "@nestjs/common";
import CacheService from "./cache.service";
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";

@Global()
@Module({
    imports: [
        NestCacheModule.register(
            {
                isGlobal: true,
                ttl: 1000 * 60 * 60, // 1 Hour TTL (in milliseconds)
                max: 10000, // Maximum number of items that can be stored in cache
            })],
    controllers: [],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule { }