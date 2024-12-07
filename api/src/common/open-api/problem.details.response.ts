import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import ProblemDetails from "../response/problem.details.response.dto";

/**
 * Decorator function that generates a problem details response for an API endpoint.
 * @param httpStatus The HTTP status code for the response.
 * @param message The optional message to include in the response.
 * @param description The optional description to include in the response.
 * @param options The optional additional options for the response.
 * @returns A decorator function that can be applied to an API endpoint.
 */
export const ProblemDetailsResponse = (httpStatus: number, message?: string, description?: string, options?: ApiResponseOptions) => {
    let properties = {};
    if (message) {
        properties = {
            message: {
                type: 'string',
                description: message
            }
        }
    }
    return applyDecorators(
        ApiExtraModels(ProblemDetails),
        ApiResponse({
            ...options,
            description,
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(ProblemDetails)
                    },
                    {
                        properties
                    }
                ],
            },
            status: httpStatus
        }),
    )
}