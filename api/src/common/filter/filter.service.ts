import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationFilter {

    async apply<T>(where: T, organizationId: number, relationshipField: string): Promise<T> {
        return {
            ...where,
            [relationshipField]: {
                some: {
                    organizationId: organizationId,
                }
            }
        };
    }
}