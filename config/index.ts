import Dotenv from 'dotenv';

Dotenv.config();

const config = {
    url: process.env.HOST,
    port: process.env.PORT || 3000,
    defaultAdminPrefix: '/dashboard',
    jwtSecret: process.env.SECRET,
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

