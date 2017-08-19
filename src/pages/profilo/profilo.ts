import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { TribuSceltaPage } from '../tribuscelta/tribuscelta';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    let utenteInfoURL = this.URLVars.utenteInfoURL();

    this.http.get(utenteInfoURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.descrizione = data.descrizione;
        this.username = data.username;
        this.avatar = data.avatar;
        this.tribu = data.tribu;
        this.pp = data.punti;

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

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
