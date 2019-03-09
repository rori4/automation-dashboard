import { post } from '../data/crud';

class AuthenticationService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth';
        this.loginUrl = `${this.baseUrl}/login`
    }

    login(credentials) {
        return post(this.loginUrl, credentials)
    }
}

export default AuthenticationService;