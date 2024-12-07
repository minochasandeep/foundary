import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ApiResponseDto from '../response/api.response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context))
        );
    }

    /**
     * Handles the response from the server.
     * @param res - The response data.
     * @param context - The execution context.
     * @returns An object containing the response details.
     */
    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = response.statusCode;

        return {
            status: 'success',
            path: request.url,
            statusCode,
            data: res,
        } as ApiResponseDto<any>;
    }
}