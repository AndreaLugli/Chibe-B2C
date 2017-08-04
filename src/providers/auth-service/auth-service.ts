import { Injectable } from '@angular/core';
import { URLVars } from '../../providers/urls-var';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class User {
  username: string;
  email: string;
  code: string;

  constructor(username: string, email: string, code: string) {
    this.username = username;
    this.email = email;
    this.code = code;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http, public URLVars:URLVars) {}

  public getUserInfo() : User {
    return this.currentUser;
  }

  public login(credentials) {}
  public logout() {}

  public register(credentials) {
    if (credentials.email === null || credentials.password_1 === null || credentials.password_2 === null || credentials.username === null) {
      return Observable.throw("Inserisci tutti i valori prima di continuare");
    }
    else {
      if(credentials.password_1 != credentials.password_2) {
        return Observable.throw("Le due password inserite non coincidono");
      }

      let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!regExp.test(credentials.email)) {
        return Observable.throw("Email non valida");
      }

      let utenteRegistrazioneURL = this.URLVars.utenteRegistrazioneURL();
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = new URLSearchParams();
      body.append('email', credentials.email);
      body.append('username', credentials.username);
      body.append('password_1', credentials.password_1);
      body.append('password_2', credentials.password_2);

      return this.http.post(utenteRegistrazioneURL, body);

    }
  }

}
