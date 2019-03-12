import { post, get } from '../data/crud';

class BookService {
  constructor() {
    this.baseUrl = "http://localhost:5000/books";
    this.addUrl = `${this.baseUrl}/add`;
    this.listUrl = `${this.baseUrl}/list`;
  }

  add(book) {
    return post(this.addUrl, book);
  }

  list(search) {
    return get(this.listUrl, search);
  }
}

export default BookService;
