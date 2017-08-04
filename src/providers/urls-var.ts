import { Injectable } from '@angular/core';

@Injectable()
export class URLVars {
  public baseURL = "http://127.0.0.1:8000";
  //public baseURL = "http://138.68.72.172";

  getBaseURL() {
    return this.baseURL;
  }

  utenteRegistrazioneURL() {
    return this.getBaseURL() + "/utente/register/";
  }

}
