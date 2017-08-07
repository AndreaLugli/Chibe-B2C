import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { ProvinciaPage } from '../provincia/provincia';

@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})

export class AvatarPage {
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) { }

  public avatar() {
    this.loading = this.loadingCtrl.create({
      content: "Invio avatar...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let utenteStep2URL = this.URLVars.utenteStep2URL();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.append('avatar', 'avatar');

    this.http.post(utenteStep2URL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ProvinciaPage);
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    )
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
