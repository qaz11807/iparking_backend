import { FindOptions } from 'sequelize';
declare const db: any;
export default db;
interface Pagenation {
    page: number;
    pageSize: number;
}
export declare const paginate: ({ page, pageSize }: Pagenation, query?: FindOptions<any> | undefined) => {
    offset: number;
    limit: number;
    include?: import("sequelize").Includeable | import("sequelize").Includeable[] | undefined;
    order?: import("sequelize").Order | undefined;
    group?: import("sequelize").GroupOption | undefined;
    lock?: boolean | import("sequelize").LOCK | {
        level: import("sequelize").LOCK;
        of: import("sequelize").ModelStatic<import("sequelize").Model<any, any>>;
    } | undefined;
    skipLocked?: boolean | undefined;
    raw?: boolean | undefined;
    having?: import("sequelize").WhereOptions<any> | undefined;
    subQuery?: boolean | undefined;
    type?: string | undefined;
    nest?: boolean | undefined;
    plain?: boolean | undefined;
    replacements?: import("sequelize").BindOrReplacements | undefined;
    bind?: import("sequelize").BindOrReplacements | undefined;
    instance?: import("sequelize").Model<any, any> | undefined;
    mapToModel?: boolean | undefined;
    retry?: import("sequelize").RetryOptions | undefined;
    fieldMap?: import("sequelize").FieldMap | undefined;
    logging?: boolean | ((sql: string, timing?: number | undefined) => void) | undefined;
    benchmark?: boolean | undefined;
    transaction?: import("sequelize").Transaction | null | undefined;
    useMaster?: boolean | undefined;
    where?: import("sequelize").WhereOptions<any> | undefined;
    attributes?: import("sequelize").FindAttributeOptions | undefined;
    paranoid?: boolean | undefined;
    indexHints?: import("sequelize").IndexHint[] | undefined;
};
