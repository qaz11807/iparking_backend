import { Request, Response, NextFunction } from 'express';
export declare const permissionAuth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const signin: (req: Request, res: Response) => void;
