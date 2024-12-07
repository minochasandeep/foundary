import { ApiResponseOptions } from '@nestjs/swagger';
import { BadRequest, InternalError, Success } from './index';
import { HttpStatus } from '@nestjs/common';

describe('index', () => {
    describe('BadRequest', () => {
        it('should create a BadRequest response with default values', () => {
            const response = BadRequest();
            expect(response).toBeDefined();
        });

        it('should create a BadRequest response with custom values', () => {
            const response = BadRequest({
                httpStatus: HttpStatus.BAD_REQUEST,
                message: 'Bad request',
                description: 'Invalid input',
                options: { headers: { 'X-Custom-Header': 'value' } } as ApiResponseOptions,
            });
            expect(response).toBeDefined();
        });
    });

    describe('InternalError', () => {
        it('should create an InternalError response with default values', () => {
            const response = InternalError();
            expect(response).toBeDefined();
        });

        it('should create an InternalError response with custom values', () => {
            const response = InternalError({
                message: 'Internal server error',
                description: 'An unexpected error occurred',
                options: { headers: { 'X-Custom-Header': 'value' } } as ApiResponseOptions,
            });
            expect(response).toBeDefined();
        });
    });

    describe('Success', () => {
        it('should create a Success response with default values', () => {
            const response = Success();
            expect(response).toBeDefined();
        });

        it('should create a Success response with custom values', () => {
            const response = Success({
                type: String,
                message: 'Success',
                description: 'Operation completed successfully',
                httpStatus: HttpStatus.CREATED,
                isPaginatedResult: true,
                options: { headers: { 'X-Custom-Header': 'value' } } as ApiResponseOptions,
            });
            expect(response).toBeDefined();
        });
    });
});