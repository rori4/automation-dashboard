import { post } from '../data/crud';

class UdemyService {
  constructor() {
    this.baseUrl = "http://localhost:5000/udemy";
    this.infoUrl = `${this.baseUrl}/info`;
  }

  info(udemyUrl) {
    return post(this.infoUrl, udemyUrl);
  }
}

export default UdemyService;
