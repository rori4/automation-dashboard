import { post, get, remove } from '../data/crud';
import BaseService from './base-service';

class CourseService extends BaseService {
  constructor() {
    super('courses')
  }
}

export default CourseService;
