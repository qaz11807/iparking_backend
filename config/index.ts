import Dotenv from 'dotenv';
import path from 'path';

Dotenv.config();

const config = {
    url: process.env.HOST,
    port: process.env.PORT || 3000,
    defaultAdminPrefix: '/dashboard',
    jwtSecret: process.env.SECRET,
    firebase: {
        databaseURL: 'https://ipark-dev-6eaf6.firebaseio.com',
        serviceAccountFilePath: path.join(__dirname, '/./ipark-dev-6eaf6-firebase-adminsdk-jlepc-21c05de00b.json'),
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

