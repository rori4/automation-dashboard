import { post, get, remove } from "../data/crud";

class PromotionService {
  constructor(type) {
    this.type = type;
    this.baseUrl = `http://localhost:5000/promotions`;
    this.saveUrl = `${this.baseUrl}/save`;
    this.deleteUrl = `${this.baseUrl}/delete`;
    this.getUrl = `${this.baseUrl}/get`;
    this.listUrl = `${this.baseUrl}/list`;
  }

  save(promotion) {
    return post(this.saveUrl, { ...promotion, type: this.type });
  }

  delete(id) {
    return remove(this.deleteUrl, { ...id, type: this.type });
  }

  get(id) {
    return get(this.getUrl, { ...id, type: this.type });
  }

  list(search) {
    return get(this.listUrl, { ...search, type: this.type });
  }
}

export default PromotionService;
