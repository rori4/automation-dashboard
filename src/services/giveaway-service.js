import { get, remove } from "../data/crud";
import { post } from "axios";
class GiveawayService {
  constructor() {
    this.baseUrl = "http://localhost:5000/giveaways";
    this.saveUrl = `${this.baseUrl}/save`;
    this.deleteUrl = `${this.baseUrl}/delete`;
    this.getUrl = `${this.baseUrl}/get`;
    this.listUrl = `${this.baseUrl}/list`;
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

  delete(id) {
    return remove(this.deleteUrl, id);
  }

  get(id) {
    return get(this.getUrl, id);
  }

  list(search) {
    return get(this.listUrl, search);
  }
}

export default GiveawayService;

const getAuthHeader = () => {
  const token = window.localStorage.getItem("auth_token");
  return token && token.length ? { Authorization: `Bearer ${token}` } : {};
};
