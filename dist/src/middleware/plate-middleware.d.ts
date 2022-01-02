import { Request, Response } from 'express';
/** Normal User */
export declare namespace user {
    const getAllPlates: (req: Request, res: Response) => Promise<void>;
    const createPlate: (req: Request, res: Response) => Promise<void>;
    const updatePlate: (req: Request, res: Response) => Promise<void>;
    const deletePlate: (req: Request, res: Response) => Promise<void>;
}
/** Admin */
export declare namespace admin {
    const createPlate: (req: Request, res: Response) => Promise<void>;
    const getAllPlates: (req: Request, res: Response) => Promise<void>;
}
