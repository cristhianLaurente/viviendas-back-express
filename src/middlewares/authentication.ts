import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = ( req: Request, res: Response, next: NextFunction ) => {
    let {token} : any = req.headers;

    jwt.verify(token, 'code', (err: any, decoded: any) => {
        if(err) {
            return res.status(401).json({
                success: false,
                error: {
                    title: 'access forbbiden',
                    message: err
                }
            })
        }

        req.query.user = decoded.user;
        next();
    })
}

export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            success: false,
            error: {
                title: 'access forbbiden',
                message: 'the user is not an administrator'
            }
        })
    }
    next();
}