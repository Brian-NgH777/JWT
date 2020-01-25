import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before', priority: 5 })
export class BodyParserMiddleware implements ExpressMiddlewareInterface {
    private jsonBodyParser;

    constructor() {
        this.jsonBodyParser = bodyParser.json();
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.jsonBodyParser(req, res, next);
    }
};
