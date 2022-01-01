import db from '../models';
import bcrypt from 'bcrypt';
import {Role} from '../models/interfaces/role';
interface User {
    username:string;
    password:string;
    role:Role;
}

(async ()=>{
    try {
        await db.sequelize.sync();
        const userDatas :Array<User>= [{
            username: 'admin',
            password: '1234',
            role: Role.admin,
        }, {
            username: 'test',
            password: '1234',
            role: Role.user,
        }];

        const salt = await bcrypt.genSalt(10);
        const response = userDatas.map(async (user)=>{
            const hash = await bcrypt.hash(user.password, salt);
            return await db.User.findOrCreate({where: {username: user.username}, defaults: {...user, password: hash}});
        });

        await Promise.all(response);
        console.log(response);
    } catch (err) {
        console.log(err);
        throw err;
    }
})();
