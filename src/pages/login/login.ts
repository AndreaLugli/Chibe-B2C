import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { DatipersonaliPage } from '../datipersonali/datipersonali';
import { AvatarPage } from '../avatar/avatar';
import { ProvinciaPage } from '../provincia/provincia';
import { IndexPage } from '../index/index';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;
  loginCredentials = { password: '', username: ''};
  error_text: any;
  isHidden: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {
    this.isHidden = true;
  }

  public login() {
    this.isHidden = true;

    this.loading = this.loadingCtrl.create({
      content: "Accesso in corso...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let utenteLogineURL = this.URLVars.utenteLogineURL();

    let body = new URLSearchParams();
    body.append('username', this.loginCredentials.username);
    body.append('password', this.loginCredentials.password);

    this.http.post(utenteLogineURL, body).map(res => res.json()).subscribe(
      success => {
        this.loading.dismiss();

        let output = success.output;

        if(output == 0) {
          this.navCtrl.setRoot(IndexPage);
        }
        else if (output == 1) {
          this.navCtrl.setRoot(DatipersonaliPage);
        }
        else if (output == 2) {
          this.navCtrl.setRoot(AvatarPage);
        }
        else if (output == 3) {
          this.navCtrl.setRoot(ProvinciaPage);
        }
      },
      error => {
        this.loading.dismiss();
        //this.showPopup("Attenzione", "Username o password errata");
        this.isHidden = false;
        this.error_text = "Username o password errata";
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
