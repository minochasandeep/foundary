import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationFilter } from './filter.service';

describe('OrganizationFilter', () => {
    let service: OrganizationFilter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrganizationFilter],
        }).compile();

        service = module.get<OrganizationFilter>(OrganizationFilter);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should apply the organization filter correctly', async () => {
        const whereCondition = {};
        const organizationId = 1;
        const relationshipField = 'site';

        const result = await service.apply(whereCondition, organizationId, relationshipField);

        expect(result).toEqual({
            site: {
                some: {
                    organizationId: organizationId,
                },
            },
        });
    });

    it('should merge the organization filter with an existing where condition', async () => {
        const whereCondition = { isActive: true };
        const organizationId = 2;
        const relationshipField = 'site';

        const result = await service.apply(whereCondition, organizationId, relationshipField);

        expect(result).toEqual({
            isActive: true,
            site: {
                some: {
                    organizationId: organizationId,
                },
            },
        });
    });

    it('should handle different relationship fields', async () => {
        const whereCondition = {};
        const organizationId = 3;
        const relationshipField = 'controller';

        const result = await service.apply(whereCondition, organizationId, relationshipField);

        expect(result).toEqual({
            controller: {
                some: {
                    organizationId: organizationId,
                },
            },
        });
    });

    it('should work with non-empty where conditions', async () => {
        const whereCondition = { status: 'active', isPublic: false };
        const organizationId = 4;
        const relationshipField = 'group';

        const result = await service.apply(whereCondition, organizationId, relationshipField);

        expect(result).toEqual({
            status: 'active',
            isPublic: false,
            group: {
                some: {
                    organizationId: organizationId,
                },
            },
        });
    });
});
