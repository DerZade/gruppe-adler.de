import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import ResponseError from './ResponseError';

export const wrapAsync = (fn: RequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction): void => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
};

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        next(err);
        return;
    }

    let status = 500;
    let msg: undefined|string;

    if (err instanceof ResponseError) {
        status = err.status;
        msg = err.message;
    }

    res.status(status);

    if (msg !== undefined && msg.length > 0) {
        res.json({ error: msg });
    } else {
        res.end();
    }
};

export function return422(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    next();
}
