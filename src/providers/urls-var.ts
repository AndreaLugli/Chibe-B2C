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

  uploadPicURL() {
    return this.getBaseURL() + "/utente/upload_picture/";
  }

  getCodeURL() {
    return this.getBaseURL() + "/utente/get_code";
  }

  getPartners() {
    return this.getBaseURL() + "/azienda/search";
  }

  getPartner(id) {
    return this.getBaseURL() + "/azienda/" + id + "/";
  }

  searchAmicoURL() {
    return this.getBaseURL() + "/utente/search_amico"
  }

  getAmiciURL() {
    return this.getBaseURL() + "/utente/amici/";
  }

  aggiungiAmicoURL() {
    return this.getBaseURL() + "/utente/amico/add/"
  }

  cancellaAmicoURL() {
    return this.getBaseURL() + "/utente/amico/delete/"
  }

  utenteInfoURL() {
    return this.getBaseURL() + "/utente/info/";
  }

  sceltaTribuURL() {
    return this.getBaseURL() + "/utente/tribu/";
  }

  modificaURL() {
    return this.getBaseURL() + "/utente/modifica/";
  }

  desideriPersonaliURL() {
    return this.getBaseURL() + "/utente/desideri/";
  }

  desideriURL() {
    return this.getBaseURL() + "/desideri/";
  }

  getDesiderioURL(id) {
    return this.desideriURL() + id + "/";
  }

  getPuntiURL() {
    return this.getBaseURL() + "/utente/punti/";
  }

  invitaPuntiURL() {
    return this.getBaseURL() + "/utente/invia-punti/";
  }

  getGruppoURL(id) {
    return this.getBaseURL() + "/utente/gruppo/" + id + "/";
  }

  getUtentiGruppoURL(id) {
    return this.getGruppoURL(id) + "utenti/";
  }

  riscattaDesiderioURL(id) {
    return this.getGruppoURL(id) + "riscatta/";
  }

  smettiSeguireURL(id) {
      return this.getGruppoURL(id) + "rimuovi/";
  }

  logoutURL() {
    return this.getBaseURL() + "/utente/logout/";
  }

  forgotPasswordURL() {
    return this.getBaseURL() + "/utente/forgot-password/";
  }

  registraTokenURL() {
    return this.getBaseURL() + "/utente/register-push/";
  }

  fbRegisterURL(token) {
    return this.getBaseURL() + "/utente/register-by-token/facebook/?access_token=" + token;
  }

  GoogleRegisterURL(token) {
    return this.getBaseURL() + "/utente/register-by-token/google-plus/?access_token=" + token;
  }

  utenteStep1FBURL() {
    return this.getBaseURL() + "/utente/step1_fb/";
  }

  getInviteCodeURL() {
    return this.getBaseURL() + "/utente/invite-code/";
  }

  urlInvite(code) {
    return this.getBaseURL() + "/invito/" + code + "/";
  }



}
