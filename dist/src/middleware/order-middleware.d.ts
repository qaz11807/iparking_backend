import { Request, Response } from 'express';
/** Normal User */
export declare namespace user {
    const getLatestOrder: (req: Request, res: Response) => Promise<void>;
    const getAllOrders: (req: Request, res: Response) => Promise<void>;
    const replyOrderChoice: (req: Request, res: Response) => Promise<void>;
    const deleteOrder: (req: Request, res: Response) => Promise<void>;
}
/** Admin */
export declare namespace admin {
    const createOrder: (req: Request, res: Response) => Promise<void>;
    const getAllOrders: (req: Request, res: Response) => Promise<void>;
}
