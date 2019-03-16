import { post, get, remove } from '../data/crud';
import BaseService from "./base-service";

class UserService extends BaseService {
  constructor() {
    super("users");
    this.changeStatusUrl =  `${this.baseUrl}/change-status`;
  }

  changeStatus(user) {
    return post(this.changeStatusUrl, user);
  }
}

export default UserService;
