import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { ProvinciaPage } from '../provincia/provincia';

@IonicPage()
@Component({
  selector: 'page-dati-fb',
  templateUrl: 'dati-fb.html',
})


export class DatiFbPage {
  loading: Loading;
  cellulare: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) { }

  stepUnoFB() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    this.loading.present();
    let utenteStep1FBURL = this.URLVars.utenteStep1FBURL();

    let body = new URLSearchParams();
    body.append('cellulare', this.cellulare);

    this.http.post(utenteStep1FBURL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ProvinciaPage);
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    );
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
