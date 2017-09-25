import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { AvatarPage } from '../avatar/avatar';

@Component({
  selector: 'page-datipersonali',
  templateUrl: 'datipersonali.html',
})

export class DatipersonaliPage {
  loading: Loading;
  stepUnoData = { nome: '', cognome: '', cellulare: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) { }

  public stepUno() {
    this.loading = this.loadingCtrl.create({
      content: "Invio informazioni...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let utenteStep1URL = this.URLVars.utenteStep1URL();

    let body = new URLSearchParams();
    body.append('nome', this.stepUnoData.nome);
    body.append('cognome', this.stepUnoData.cognome);
    body.append('cellulare', this.stepUnoData.cellulare);

    this.http.post(utenteStep1URL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.navCtrl.setRoot(AvatarPage);
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
