import { post, get, remove } from '../data/crud';

class BaseService {
  constructor(endpoint) {
    this.baseUrl = `http://localhost:5000/${endpoint}`;
    this.saveUrl = `${this.baseUrl}/save`;
    this.deleteUrl = `${this.baseUrl}/delete`;
    this.getUrl = `${this.baseUrl}/get`;
    this.listUrl = `${this.baseUrl}/list`;
    this.allUrl =  `${this.baseUrl}/all`;
  }

  save(book) {
    return post(this.saveUrl, book);
  }

  delete(id){
    return remove(this.deleteUrl, id);    
  }

  get(id) {
    return get(this.getUrl, id);
  }

  list(search) {
    return get(this.listUrl, search);
  }

  all(search) {
    return get(this.allUrl, search);
  }
}

export default BaseService;
