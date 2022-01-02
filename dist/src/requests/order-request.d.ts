/// <reference types="qs" />
/// <reference types="express" />
/** User */
export declare namespace user {
    const getAllOrders: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
    const replyOrderChoice: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
    const deleteOrder: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
}
/** Admin */
export declare namespace admin {
    const createOrder: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
    const getAllOrders: (((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
}
