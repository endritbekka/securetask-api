import { Request } from 'express';
import { RequestBody, RequestParams } from '../../lib/types';

export interface BaseRequest {
    body: RequestBody,
    query: qs.ParsedQs,
    params: RequestParams
}

export class BaseRequestClass implements BaseRequest {
    public body: RequestBody;
    public query: qs.ParsedQs;
    public params: RequestParams;

    constructor(req: Request) {
        this.body = req.body;
        this.query = req.query;
        this.params = req.params;
    }

    private only<T>(obj: T, keys: (keyof T)[]) {
        const newObj: Partial<T> = {};
        keys.forEach(key => newObj[key] = obj[key]);
        return newObj as T;
    }

    public onlyBody<T>(obj: T, keys: (keyof T)[]) {
        return this.only(obj, keys)
    }
}
