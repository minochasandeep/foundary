import { ApiResponseOptions } from '@nestjs/swagger';
import { ProblemDetailsResponse } from './problem.details.response';
import { HttpStatus, Type } from '@nestjs/common';
import { SuccessResponse } from './success.response';

/**
 * Creates a BadRequest response.
 * @param input - An optional object containing the following properties:
 *   - httpStatus: The HTTP status code. Defaults to HttpStatus.BAD_REQUEST.
 *   - message: The error message.
 *   - description: The error description.
 *   - options: Additional options for the API response.
 * @returns The ProblemDetailsResponse.
 */
export function BadRequest(input?: {
    httpStatus?: HttpStatus;
    message?: string;
    description?: string;
    options?: ApiResponseOptions;
}) {
    return ProblemDetailsResponse(
        input?.httpStatus ?? HttpStatus.BAD_REQUEST,
        input?.message,
        input?.description,
        input?.options,
    );
}

/**
 * Creates an InternalError response.
 * @param input - An optional object containing the following properties:
 *   - message: The error message.
 *   - description: The error description.
 *   - options: Additional options for the API response.
 * @returns The ProblemDetailsResponse.
 */
export function InternalError(input?: {
    message?: string;
    description?: string;
    options?: ApiResponseOptions;
}) {
    return ProblemDetailsResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        input?.message,
        input?.description,
        input?.options,
    );
}

/**
 * Creates a Success response.
 * @param input - An optional object containing the following properties:
 *   - type: The type of the response model.
 *   - message: The success message.
 *   - description: The success description.
 *   - httpStatus: The HTTP status code. Defaults to HttpStatus.OK.
 *   - isPaginatedResult: Indicates if the response is a paginated result.
 *   - options: Additional options for the API response.
 * @returns The SuccessResponse.
 */
export const Success = <TModel extends Type<unknown>>(input?: {
    type?: TModel | [TModel] | null;
    message?: string;
    description?: string;
    httpStatus?: HttpStatus;
    isPaginatedResult?: boolean;
    options?: ApiResponseOptions;
}) => {
    return SuccessResponse({
        type: input?.type,
        message: input?.message,
        description: input?.description,
        httpStatus: input?.httpStatus ?? HttpStatus.OK,
        isPaginatedResult: input?.isPaginatedResult,
        options: input?.options,
    });
}