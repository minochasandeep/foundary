import { ApiResponseOptions } from '@nestjs/swagger';
import { ProblemDetailsResponse } from './problem.details.response';

describe('ProblemDetailsResponse', () => {
    it('should generate a problem details response with status code 400 and message', () => {
        const decorator = ProblemDetailsResponse(400, 'Bad Request');
        expect(decorator).toBeDefined();
    });

    it('should generate a problem details response with status code 500, message, and description', () => {
        const decorator = ProblemDetailsResponse(500, 'Internal Server Error', 'An unexpected error occurred');
        expect(decorator).toBeDefined();
    });

    it('should generate a problem details response with status code 200, message, description, and additional options', () => {
        const options = { headers: { 'X-Custom-Header': 'value' } } as ApiResponseOptions;
        const decorator = ProblemDetailsResponse(404, 'Not Found', 'Requested object not found', options);
        expect(decorator).toBeDefined();
    });
});