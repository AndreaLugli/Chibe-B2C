import { Injectable } from '@angular/core';

@Injectable()
export class URLVars {
  //public baseURL = "http://127.0.0.1:8000";
  public baseURL = "http://app.chibeapp.com";

  getBaseURL() {
    return this.baseURL;
  }

  checkConnectedURL() {
    return this.getBaseURL() + "/utente/check_connected/";
  }

  utenteRegistrazioneURL() {
    return this.getBaseURL() + "/utente/register/";
  }

  utenteLogineURL() {
    return this.getBaseURL() + "/utente/login/";
  }

  utenteStep1URL() {
    return this.getBaseURL() + "/utente/step1/";
  }

  utenteStep2URL() {
    return this.getBaseURL() + "/utente/step2/";
  }

  utenteStep3URL() {
    return this.getBaseURL() + "/utente/step3/";
  }

  provinceURL() {
    return this.getBaseURL() + "/utente/province/";
  }

  provinciaIDURL(id) {
    return this.provinceURL() + id + "/";
  }


}
