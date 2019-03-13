import { post, get, remove } from '../data/crud';

class CourseService {
  constructor() {
    this.baseUrl = "http://localhost:5000/courses";
    this.saveUrl = `${this.baseUrl}/save`;
    this.deleteUrl = `${this.baseUrl}/delete`;
    this.getUrl = `${this.baseUrl}/get`;
    this.listUrl = `${this.baseUrl}/list`;
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
}

export default CourseService;
