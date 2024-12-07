import { ApiProperty } from '@nestjs/swagger';

export class IPaginationResult<T> {
    @ApiProperty()
    items: T[];
    @ApiProperty()
    total: number;
    @ApiProperty()
    currentPage: number;
    @ApiProperty()
    totalPages: number;
    @ApiProperty()
    pageSize: number;
}

export type PaginateOptions = { page?: number | string, pageSize?: number | string }
export type PaginateFunction = <T, K>(model: any, args?: K, options?: PaginateOptions) => Promise<IPaginationResult<T>>

export const paginate: PaginateFunction = async (model, args: any = { where: undefined }, options: PaginateOptions) => {
    const page = Number(options?.page) || 1;
    const pageSize = Number(options?.pageSize) || 10;

    const skip = page > 0 ? pageSize * (page - 1) : 0;
    const [total, data] = await Promise.all([
        model.count({ where: args.where }),
        model.findMany({
            ...args,
            take: pageSize,
            skip,
        }),
    ]);
    const totalPages = Math.ceil(total / pageSize);

    return {
        items: data,
        total,
        currentPage: page,
        totalPages,
        pageSize,
    };
};