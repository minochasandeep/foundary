import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import CacheService from './cache.service';

describe('CacheService', () => {
    let cacheService: CacheService;
    let cacheManager: Cache;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CacheService,
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                        del: jest.fn(),
                        reset: jest.fn(),
                        store: {
                            keys: jest.fn()
                        }
                    },
                },
            ],
        }).compile();

        cacheService = module.get<CacheService>(CacheService);
        cacheManager = module.get<Cache>(CACHE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('get', () => {
        it('should call cacheManager.get with the provided key', async () => {
            const key = 'testKey';
            await cacheService.get(key);
            expect(cacheManager.get).toHaveBeenCalledWith(key);
        });

        it('should return the value from cacheManager.get', async () => {
            const key = 'testKey';
            const value = 'testValue';
            jest.spyOn(cacheManager, 'get').mockResolvedValue(value);
            const result = await cacheService.get(key);
            expect(result).toBe(value);
        });
    });

    describe('getOrAdd', () => {
        it('should call cacheManager.get with the provided key', async () => {
            const key = 'testKey';
            const func = jest.fn();
            await cacheService.getOrAdd(key, func);
            expect(cacheManager.get).toHaveBeenCalledWith(key);
        });

        it('should return the value from cacheManager.get if it exists', async () => {
            const key = 'testKey';
            const value = 'testValue';
            jest.spyOn(cacheManager, 'get').mockResolvedValue(value);
            const result = await cacheService.getOrAdd(key, jest.fn());
            expect(result).toBe(value);
        });

        it('should call the provided function and cache the result if the value does not exist', async () => {
            const key = 'testKey';
            const value = 'testValue';
            const func = jest.fn().mockResolvedValue(value);
            jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
            await cacheService.getOrAdd(key, func);
            expect(func).toHaveBeenCalled();
            expect(cacheManager.set).toHaveBeenCalledWith(key, value, undefined);
        });
    });

    describe('add', () => {
        it('should call cacheManager.set with the provided key, value, and ttl', async () => {
            const key = 'testKey';
            const value = 'testValue';
            const ttl = 60;
            await cacheService.add(key, value, ttl);
            expect(cacheManager.set).toHaveBeenCalledWith(key, value, ttl);
        });
    });

    describe('delete', () => {
        it('should call cacheManager.del with the provided key', async () => {
            const key = 'testKey';
            await cacheService.delete(key);
            expect(cacheManager.del).toHaveBeenCalledWith(key);
        });
    });

    describe('clear', () => {
        it('should call cacheManager.reset', async () => {
            await cacheService.clear();
            expect(cacheManager.reset).toHaveBeenCalled();
        });
    });
    describe('getKeys', () => {
        it('should return keys with the provided prefix', async () => {
            // Arrange
            const key = 'testKey';
            const value = 'testValue';
            const ttl = 60;
            const prefix = 'test';

            // Act
            await cacheService.add(key, value, ttl);
            const keys = await cacheService.getKeys(prefix);

            // Assert
            expect(cacheManager.store.keys).toHaveBeenCalledWith(prefix);
        });
    });
});