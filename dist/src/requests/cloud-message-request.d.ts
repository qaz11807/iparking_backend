/// <reference types="qs" />
/// <reference types="express" />
/** Admin */
export declare namespace admin {
    const simulateEnter: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
    const simulateExit: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
}
