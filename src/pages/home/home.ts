import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { RegistrazionePage } from '../registrazione/registrazione';
import { LoginPage } from '../login/login';
import { DatipersonaliPage } from '../datipersonali/datipersonali';
import { AvatarPage } from '../avatar/avatar';
import { ProvinciaPage } from '../provincia/provincia';
import { IndexPage } from '../index/index';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {

    /*
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    this.loading.present();
    */

    let checkConnectedURL = this.URLVars.checkConnectedURL();

    this.http.get(checkConnectedURL).map(res => res.json()).subscribe(
      success => {
        if(success == 0) {
          this.navCtrl.setRoot(IndexPage);
        }
        else if (success == 1) {
          this.navCtrl.setRoot(DatipersonaliPage);
        }
        else if (success == 2) {
          this.navCtrl.setRoot(AvatarPage);
        }
        else if (success == 3) {
          this.navCtrl.setRoot(ProvinciaPage);
        }
      },
      error => {
        console.log("Nope");
        //this.loading.dismiss();
      }
    );
  }

  registrazione() {
    this.navCtrl.push(RegistrazionePage);
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goForgetPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
