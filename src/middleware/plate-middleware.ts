import db, {paginate} from '../../models';
import {Request, Response} from 'express';
import UserInstance from '../../models/interfaces/user-interface';
import {ResponseStatus} from '../interfaces/response';

const User = db.User;
const Plate = db.Plate;

export const checkPlateIsExist = async (license:string, id: number| null) : Promise<boolean> => {
    try {
        const plate = await Plate.findOne({where: {id, license}});
        return plate !== null;
    } catch (err) {
        throw err;
    }
};

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
            const isExist = await checkPlateIsExist(license, null);
            if (isExist) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
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
            const isExist = await checkPlateIsExist(license, +plateId);
            if (isExist) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            await user.createPlate({
                license: license,
            });
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

    export const getCount = async (req:Request, res:Response) => {
        try {
            const count = await Plate.count();
            res.json({
                status: ResponseStatus.Success,
                data: count,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getPlate = async (req:Request, res:Response) => {
        try {
            const plate = await Plate.findOne({
                where: {id: req.params.id},
                attributes: [
                    'id', 'license',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            });
            if (plate == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate not Exist !',
                });
            }
            res.json({
                status: ResponseStatus.Success,
                data: plate,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getAllPlates = async (req:Request, res:Response) => {
        try {
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const plates = await Plate.findAll(
                paginate({page: page, pageSize: pageSize}, {
                    attributes: [
                        'id', 'license',
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                }),
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
            const payload = req.body;
            let userId;
            if (payload.User) {
                const user = await User.findOne({where: {username: payload.User.username}});
                if (!user) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }

            const isExist = await checkPlateIsExist(payload.license, null);
            if (isExist) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }

            const created = {
                license: payload.license,
                UserId: userId,
            };

            await Plate.create(created);
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const updatePlate = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            let userId;
            if (payload.User) {
                const user = await User.findOne({where: {username: payload.User.username}});
                if (!user) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const isExist = await checkPlateIsExist(payload.license, +payload.id);
            if (isExist) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            const updated = {
                license: payload.license,
                UserId: userId,
            };
            await Plate.update(updated, {where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const deletePlate = async (req:Request, res:Response) => {
        try {
            await Plate.destroy({where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };
}
