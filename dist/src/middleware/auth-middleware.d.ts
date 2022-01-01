import {Request, Response, NextFunction} from 'express';
export declare const permissionAuth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
declare const _default: (req: Request, res: Response) => void;
export default _default;
