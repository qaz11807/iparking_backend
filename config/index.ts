import Dotenv from 'dotenv';
import path from 'path';

Dotenv.config();

const config = {
    url: process.env.HOST,
    port: process.env.PORT || 3000,
    defaultAdminPrefix: '/dashboard',
    jwtSecret: process.env.SECRET,
    firebase: {
        serviceAccountFilePath: path.join(__dirname, '/../firebase/iparking-40634-firebase-adminsdk-rkufr-79d084e0fa.json'),
    },
    database: {
        username: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DBNAME,
        password: process.env.DBPASS || null,
        dialect: 'postgres',
        ssl: process.env.SSLMODE,
    },
};

export default config;

