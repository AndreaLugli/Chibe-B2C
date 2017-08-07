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

  utenteStep1URL() {
    return this.getBaseURL() + "/utente/step1/";
  }

  utenteStep2URL() {
    return this.getBaseURL() + "/utente/step2/";
  }

  utenteStep3URL() {
    return this.getBaseURL() + "/utente/step3";
  }

  provinceURL() {
    return this.getBaseURL() + "/utente/province";
  }
}
