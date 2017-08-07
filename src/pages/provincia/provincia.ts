import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-provincia',
  templateUrl: 'provincia.html',
})

export class ProvinciaPage {
  loading: Loading;
  province: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let provinceURL = this.URLVars.provinceURL();

    this.http.get(provinceURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.province = data;
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
