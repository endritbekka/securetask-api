import UserService from "../../services/UserService";
import { BaseRequest } from "../Requests/BaseRequest";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createAndSave(request: BaseRequest) {
    return await this.userService.createAndSave();
  }
}

export default new UserController();
