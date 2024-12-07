import { HttpStatus, Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import ApiResponseDto from "../response/api.response.dto";
import { IPaginationResult } from "../utils/pagination/pagination";

/**
 * Defines a decorator function for generating success response metadata for API endpoints.
 * @param input - An object containing the following properties:
 *   - type: The data transfer object (DTO) type or an array of DTO types.
 *   - message: An optional message to include in the response.
 *   - description: An optional description for the response.
 *   - httpStatus: An optional HTTP status code for the response. Defaults to 200 (OK).
 *   - isPaginatedResult: A boolean indicating whether the response represents a paginated result.
 *   - options: Additional options for the `ApiResponse` decorator.
 * @returns A decorator function that can be applied to a controller method.
 */
export const SuccessResponse = <TModel extends Type<unknown>>(input: {
    type?: TModel | [TModel] | null;
    message?: string;
    description?: string;
    httpStatus?: number;
    isPaginatedResult?: boolean;
    options?: ApiResponseOptions
}) => {
    const { type: dataDto, description, httpStatus, options, message, isPaginatedResult } = input;

    let model: TModel;
    let extraModules: Type[] = [];

    // Generate properties for the default response
    const generateDefaultProperties = (dataDto: TModel): any => {
        model = dataDto;
        extraModules.push(model);
        let properties = {
            data: {
                $ref: getSchemaPath(model),
            },
        };

        return properties;
    }

    // Generate properties for a paginated result
    const generatePropertiesForPaginatedResult = (dataDto: TModel, primitiveTypes: string[]): any => {
        extraModules.push(IPaginationResult);
        let properties = {
            data: {
                $ref: getSchemaPath(IPaginationResult),
                properties: {
                    data: {
                        type: 'array',
                        items: {
                        },
                    }
                }
            },
        };

        // Check if the data type is a primitive type
        if (primitiveTypes.includes((dataDto as any).name)) {
            properties.data.properties.data.items = {
                type: (dataDto as any).name.toLowerCase(),
            }
        } else {
            model = dataDto;
            extraModules.push(model);
            properties.data.properties.data.items = {
                $ref: getSchemaPath(model),
            }
        }

        return properties;
    }

    // Generate properties for a primitive type
    const generatePropertiesForPrimitiveType = (dataDto: TModel): any => {
        let properties = {
            data: {
                type: (dataDto as any).name.toLowerCase(),
            },
        };
        return properties;
    }

    // Generate properties for an array type
    const generatePropertiesForArrayType = (dataDto: TModel, primitiveTypes: string[]): any => {
        let properties = {};
        if (primitiveTypes.includes((dataDto as any).name)) {
            properties = {
                data: {
                    type: 'array',
                    items: {
                        type: (dataDto as any).name.toLowerCase(),
                    }
                },
            };
        } else {
            model = dataDto;
            extraModules.push(model);
            properties = {
                data: {
                    type: 'array',
                    items: {
                        $ref: getSchemaPath(model),
                    },
                },
            };
        }
        return properties;
    }

    // Generate properties for the OpenAPI schema
    const openApiPropertyGenerator = (dataDto: TModel | [TModel] | null, isPaginatedResult: boolean, message: string): any => {
        const primitiveTypes = ['String', 'Boolean', 'Number'];
        let properties = {};
        if (dataDto) {
            if (Array.isArray(dataDto)) {
                properties = generatePropertiesForArrayType(dataDto[0], primitiveTypes);
            }
            else if (primitiveTypes.includes((dataDto as any).name)) {
                properties = generatePropertiesForPrimitiveType(dataDto);
            }
            else if (isPaginatedResult) {
                properties = generatePropertiesForPaginatedResult(dataDto, primitiveTypes);
            }
            else {
                properties = generateDefaultProperties(dataDto);
            }
        }

        if (message) {
            properties['message'] = {
                type: 'string',
                description: message
            }
        }

        return properties;
    }

    let properties = openApiPropertyGenerator(dataDto, isPaginatedResult, message);

    return applyDecorators(
        ApiExtraModels(ApiResponseDto, ...extraModules),
        ApiResponse({
            ...options,
            description,
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(ApiResponseDto)
                    },
                    {
                        properties
                    }
                ],
            },
            status: httpStatus || HttpStatus.OK
        }),
    )
}