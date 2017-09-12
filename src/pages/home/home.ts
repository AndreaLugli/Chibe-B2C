import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { RegistrazionePage } from '../registrazione/registrazione';
import { LoginPage } from '../login/login';
import { ProvinciaPage } from '../provincia/provincia';
import { IndexPage } from '../index/index';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { DatiFbPage } from '../dati-fb/dati-fb';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook, public URLVars:URLVars, public http: Http) {}

  registrazione() {
    this.navCtrl.push(RegistrazionePage);
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goForgetPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  FacebookLogin() {
    this.fb.login(['public_profile', 'email'])
    .then(
      (res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!');
        let authResponse = res.authResponse;
        let accessToken = authResponse.accessToken;

        let fbRegisterURL = this.URLVars.fbRegisterURL(accessToken);

        this.http.get(fbRegisterURL).map(res => res.json()).subscribe(
          data => {
            let output = data.output;

            if(output == 0) {
              this.navCtrl.setRoot(IndexPage);
            }
            else if (output == 1) {
              this.navCtrl.setRoot(DatiFbPage);
            }
            else if (output == 2) {
              this.navCtrl.setRoot(ProvinciaPage);
            }
          },
          error => {
            alert("OH NO");
          }
        );

      }
    ).catch(e => console.log('Error logging into Facebook', e));
  }

}
