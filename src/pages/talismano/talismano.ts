import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-talismano',
  templateUrl: 'talismano.html',
})

export class TalismanoPage {
  loading: Loading;
  codice: any;
  background: any;
  foreground: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.background = "white";
    this.foreground = "black";
    this.title = "Talismano";

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getCodeURL = this.URLVars.getCodeURL();

    this.http.get(getCodeURL).subscribe(
      data => {
        this.loading.dismiss();
        this.codice = data.text();
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
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
