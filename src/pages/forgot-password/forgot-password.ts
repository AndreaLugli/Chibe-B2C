import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})

export class ForgotPasswordPage {
  loading: Loading;
  email: any;
  isHidden: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {
    this.isHidden = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  resetPassword() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let forgotPasswordURL = this.URLVars.forgotPasswordURL();
    let body = new URLSearchParams();
    body.append('email', this.email);

    this.http.post(forgotPasswordURL, body).map(res => res.json()).subscribe(
      success => {
        this.loading.dismiss();
        this.isHidden = false;
      },
      error => {
        this.loading.dismiss();
        this.isHidden = false;
      }
    );

  }

}
