import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn:string;
  localId:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient ) {
  }

  signup(email: string, password: string) {
    this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHp4S91iPdK4AtG0qP8KRYr8qp8DNgKBg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }
}
