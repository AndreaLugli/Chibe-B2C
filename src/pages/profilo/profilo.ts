import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { TribuSceltaPage } from '../tribuscelta/tribuscelta';
import { ModificaProfiloPage } from '../modificaprofilo/modificaprofilo'
import { DesideriPage } from '../desideri/desideri'

@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})

export class ProfiloPage {
  loading: Loading;
  descrizione: any;
  avatar: any;
  username: any;
  tribu: any;
  pp: any;
  utente: any;
  modifica_tribu: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.title = "Profilo";
    
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    let utenteInfoURL = this.URLVars.utenteInfoURL();

    this.http.get(utenteInfoURL).map(res => res.json()).subscribe(
      data => {
        console.log(data)
        this.loading.dismiss();
        this.descrizione = data.descrizione;
        this.username = data.username;
        this.avatar = data.avatar;
        this.tribu = data.tribu;
        this.pp = data.punti;
        this.utente = data;
        this.modifica_tribu = data.modifica_tribu;
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );
  }

  scegliTribu() {
    this.navCtrl.push(TribuSceltaPage);
  }

  modificaProfilo() {
    this.navCtrl.push(ModificaProfiloPage, {utente : this.utente});
  }

  listaDesideri() {
    this.navCtrl.push(DesideriPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
