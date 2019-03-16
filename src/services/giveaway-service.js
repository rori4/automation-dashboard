import { get, remove } from "../data/crud";
import { post } from "axios";
import BaseService from './base-service';

class GiveawayService extends BaseService {
  constructor() {
    super('giveaways')
  }

  save(giveaway) {
    let formData = new FormData();
    for (var key in giveaway) {
      formData.append(key, giveaway[key]);
    }
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    let config = {
      headers: {
        "content-type": "multipart/form-data",
        ...getAuthHeader()
      }
    };
    return post(this.saveUrl, formData, config);
  }
}

export default GiveawayService;

const getAuthHeader = () => {
  const token = window.localStorage.getItem("auth_token");
  return token && token.length ? { Authorization: `Bearer ${token}` } : {};
};
