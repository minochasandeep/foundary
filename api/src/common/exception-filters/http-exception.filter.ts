import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import ProblemDetails from '../response/problem.details.response.dto';
import Logger from '../logger/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(private readonly logger: Logger) {
        this.logger.setContext(HttpExceptionFilter.name);
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        this.handleException(exception, host);
    }

    /**
     * Handles HTTP exceptions and returns a standardized response.
     * @param exception - The HTTP exception to handle.
     * @param context - The execution context of the request.
     */
    handleException(exception: HttpException, context: ArgumentsHost) {
        const ctx = context.switchToHttp();
        const env = process.env.NODE_ENV || 'development';
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        this.logger.error(exception.message, exception.stack, request.path);


        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // check if the exception is a validation error
        if (status === HttpStatus.BAD_REQUEST && exception.getResponse() && (exception.getResponse() as any).validationError) {
            response.status(status).json({
                status: 'error',
                statusCode: status,
                path: request.url,
                message: exception.message,
                data: null,
                validations: (exception.getResponse() as any)?.errors || exception.getResponse()
            } as ProblemDetails);
        }
        // check if the exception is a not found error or unauthorized
        else if (status === HttpStatus.NOT_FOUND || status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
            response.status(status).json({
                status: 'error',
                statusCode: status,
                path: request.url,
                message: exception.message,
                data: null
            } as ProblemDetails);
        }
        // default error response
        else {
            response.status(status).json({
                status: 'error',
                statusCode: status,
                path: request.url,
                message: exception.message || 'Internal server error',
                data: env == 'development' ? exception : null,
            } as ProblemDetails);
        }
    }
}