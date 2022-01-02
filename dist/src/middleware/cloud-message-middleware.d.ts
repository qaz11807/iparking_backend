import { Request, Response } from 'express';
/** Admin */
export declare namespace admin {
    const simulateEnter: (req: Request, res: Response) => Promise<void>;
    const simulateExit: (req: Request, res: Response) => Promise<void>;
}
