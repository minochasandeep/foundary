import { ApiResponseOptions } from "@nestjs/swagger";
import { SuccessResponse } from "./success.response";

describe("SuccessResponse", () => {
    it("should generate success response metadata for a single DTO type", () => {
        // Arrange
        const input = {
            type: MyDto,
            message: "Success",
            description: "Successful response",
            httpStatus: 200,
            isPaginatedResult: false,
            options: { headers: { "X-Custom-Header": "value" } } as ApiResponseOptions,
        };

        // Act
        const decorator = SuccessResponse(input);

        // Assert
        expect(decorator).toBeDefined();
    });

    it("should generate success response metadata for an array of DTO types", () => {
        // Arrange
        const input = {
            message: "Success",
            description: "Successful response",
            httpStatus: 200,
            isPaginatedResult: false,
            options: { headers: { "X-Custom-Header": "value" } } as ApiResponseOptions,
        };

        // Act
        const decorator = SuccessResponse({ type: [MyDto], ...input });

        // Assert
        expect(decorator).toBeDefined();
    });

    it("should generate success response metadata for an array of primitive types", () => {
        // Arrange
        const input = {
            message: "Success",
            description: "Successful response",
            httpStatus: 200,
            isPaginatedResult: false,
            options: { headers: { "X-Custom-Header": "value" } } as ApiResponseOptions,
        };

        // Act
        const decorator = SuccessResponse({ type: [String], ...input });

        // Assert
        expect(decorator).toBeDefined();
    });

    it("should generate success response metadata for a paginated result", () => {
        // Arrange
        const input = {
            type: MyDto,
            message: "Success",
            description: "Successful response",
            httpStatus: 200,
            isPaginatedResult: true,
            options: { headers: { "X-Custom-Header": "value" } } as ApiResponseOptions,
        };

        // Act
        const decorator = SuccessResponse(input);

        // Assert
        expect(decorator).toBeDefined();
    });

    it("should generate success response metadata for a primitive type", () => {
        // Arrange
        const input = {
            type: Number,
            message: "Success",
            description: "Successful response",
            httpStatus: 200,
            isPaginatedResult: false,
            options: { headers: { "X-Custom-Header": "value" } } as ApiResponseOptions,
        };

        // Act
        const decorator = SuccessResponse(input);

        // Assert
        expect(decorator).toBeDefined();
    });
});

class MyDto {
    test: string;
}