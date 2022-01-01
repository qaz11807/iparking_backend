import db, {paginate} from '../../models';
import {Request, Response} from 'express';
import UserInstance from '../../models/interfaces/user-interface';
import {ResponseStatus} from '../interfaces/response';

const User = db.User;
const Plate = db.Plate;

/** Normal User */

export namespace user{
    export const getAllPlates = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const plates = await user.getPlates(
                paginate({page: page, pageSize: pageSize}),
            );
            res.json({
                status: ResponseStatus.Success,
                data: plates,
            });
        } catch (error) {
            throw error;
        }
    };

    export const createPlate = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const license = req.body.license;
            await user.createPlate({
                license: license,
            });
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const updatePlate = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const plateId = req.params.id;
            const license = req.body.license;

            const plates = await user.getPlates({
                where: {id: plateId}, raw: true,
            });
            const plate = plates[0];

            if (plate == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate not exist!',
                });
            } else {
                const updatedPlate = await plate.update({
                    license: license,
                });
                res.json({
                    status: ResponseStatus.Success,
                    data: updatedPlate,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    export const deletePlate = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const plateId = req.params.id;

            const plates = await user.getPlates({
                where: {id: plateId}, raw: true,
            });
            const plate = plates[0];

            if (plate == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate not exist!',
                });
            } else {
                await plate.destroy();
                res.json({
                    status: ResponseStatus.Success,
                });
            }
        } catch (error) {
            throw error;
        }
    };
}


/** Admin */

export namespace admin{
    export const createPlate = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            const user = await User.findOne({where: {id: payload.userId}});
            const mockPlate = {
                license: payload.license,
            };
            const instance = await user.createPlate(mockPlate);
            res.json({
                status: ResponseStatus.Success,
                data: instance.toJson(),
            });
        } catch (error) {
            throw error;
        }
    };

    export const getAllPlates = async (req:Request, res:Response) => {
        try {
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const order = await Plate.findAll(
                paginate({page: page, pageSize: pageSize}),
            );
            res.json({
                status: ResponseStatus.Success,
                data: order,
            });
        } catch (error) {
            throw error;
        }
    };
}
