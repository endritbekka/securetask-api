

import { Entity } from 'redis-om';
import UserService from '../services/UserService'

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }

    public async createAndSave() {
        return await this.userService.createAndSave();
    }
}

export default new UserController();