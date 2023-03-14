import { Response } from "express";

class RouteResponse {
    public success(res: Response, body: any) {
        res.status(200).json({
            error: false,
            message: body
        })
    }
}

export default new RouteResponse();