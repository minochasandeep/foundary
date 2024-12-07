import { ApiProperty } from "@nestjs/swagger";

export default class ApiResponseDto<T> {
    @ApiProperty({ description: 'The status of the response', enum: ['success', 'error'] })
    status: 'success' | 'error';

    @ApiProperty({ description: 'The status code of the response' })
    statusCode: number;

    @ApiProperty({ description: 'The path of the request' })
    path: string;

    @ApiProperty({ description: 'The message of the response' })
    message: string;

    @ApiProperty({ description: 'The result of the response' })
    data: T;
}