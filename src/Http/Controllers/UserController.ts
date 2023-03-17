
import BaseRequest from '../Requests/BaseRequest';
import BaseResponse from '../Responses/BaseResponse';
import UserService from '../../services/UserService'
import UserRequest from '../Requests/UserRequest';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }

    public async createAndSave(request: UserRequest, response: BaseResponse) {        
        console.log('request:', request.testUserRequest())
        return await this.userService.createAndSave();
    }
}

export default new UserController();