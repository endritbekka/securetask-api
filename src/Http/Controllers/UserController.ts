import UserService from "../../services/UserService";
import { ValidatedRequest } from "../../lib/types";
import { CreateAndSaveUserRequest } from "../../lib/RouteValidations";
import { UserEmailExists } from "../../utils/exceptions/Exceptions";
import Bcrypt from "../../lib/Bcrypt"

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createAndSave(request: ValidatedRequest<CreateAndSaveUserRequest>) {
    if (await this.userService.emailExists(request.body.email)) {
      throw new UserEmailExists()
    }
    request.body.password = await Bcrypt.hash(request.body.password)
    return await this.userService.createAndSave(request.body);
  }
}

export default new UserController();
