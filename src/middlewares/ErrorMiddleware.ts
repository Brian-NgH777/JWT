import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, InternalServerError, HttpError } from 'routing-controllers';
import { QueryFailedError } from 'typeorm';

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: HttpError, req: Request, res: Response, next: NextFunction) {
        if (err.name === QueryFailedError.name)
            err = new InternalServerError(err.message);

        res.status(err.httpCode || 500);
        res.send(err);
    }
};
