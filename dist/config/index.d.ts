declare const config: {
    url: string | undefined;
    port: string | number;
    defaultAdminPrefix: string;
    jwtSecret: string | undefined;
    firebase: {
        databaseURL: string;
        serviceAccountFilePath: string;
    };
    database: {
        username: string | undefined;
        host: string | undefined;
        database: string | undefined;
        password: string | null;
        dialect: string;
        ssl: string | undefined;
    };
};
export default config;
