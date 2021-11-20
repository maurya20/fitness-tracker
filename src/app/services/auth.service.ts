import { IAuthData } from '../models/auth-data.model';
import { IUser } from '../models/user.model';
import { Subject } from 'rxjs';
export class AuthService {
  private user: IUser;
  authChange = new Subject<boolean>();
  registerUser(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
  }
  login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
  }
  getUser() {
    return { ...this.user };
  }
  isAuthenticated() {
    return this.user !== null;
  }
}
