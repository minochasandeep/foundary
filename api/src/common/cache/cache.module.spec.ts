import { Test } from "@nestjs/testing";
import { CacheModule } from "./cache.module";
import CacheService from "./cache.service";

describe("CacheModule", () => {
    let cacheService: CacheService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CacheModule],
        }).compile();

        cacheService = moduleRef.get<CacheService>(CacheService);
    });

    it("should be defined", () => {
        expect(cacheService).toBeDefined();
    });

    it("should set and get value from cache", async () => {
        const key = "testKey";
        const value = "testValue";

        await cacheService.add(key, value);
        const retrievedValue = await cacheService.get(key);

        expect(retrievedValue).toEqual(value);
    });

    it("should return null for non-existing key", async () => {
        const key = "nonExistingKey";

        const retrievedValue = await cacheService.get(key);

        expect(retrievedValue).toBeFalsy();
    });

    it("should delete value from cache", async () => {
        const key = "testKey";
        const value = "testValue";

        await cacheService.add(key, value);
        await cacheService.delete(key);
        const retrievedValue = await cacheService.get(key);

        expect(retrievedValue).toBeFalsy();
    });
});