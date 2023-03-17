import { Request } from "express";
import BaseRequest from "./BaseRequest";

class UserRequest extends BaseRequest {
    constructor(req: Request) {
        super(req)
    }

    public testUserRequest() {
        console.log('user')
    } 
    
}

export default UserRequest