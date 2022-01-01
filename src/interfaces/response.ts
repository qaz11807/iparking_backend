export enum ResponseStatus{
    Success = 'Success',
    Failed = 'Failed'
}

export interface ResponseFormat<T>{
    status: ResponseStatus;
    message?: string ;
    payload?: T ;
}
