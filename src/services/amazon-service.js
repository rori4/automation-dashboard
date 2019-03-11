import { post } from '../data/crud';

class AmazonService {
  constructor() {
    this.baseUrl = "http://localhost:5000/amazon";
    this.infoUrl = `${this.baseUrl}/info`;
  }

  info(amazonUrl) {
    return post(this.infoUrl, amazonUrl);
  }
}

export default AmazonService;
