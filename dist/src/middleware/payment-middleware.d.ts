import { Request, Response } from 'express';
/** Normal User */
export declare namespace user {
    const getPayUrl: (req: Request, res: Response) => Promise<void>;
    const paidResultCallback: (req: Request, res: Response) => Promise<void>;
}
