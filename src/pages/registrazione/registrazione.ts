import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

import { DatipersonaliPage } from '../datipersonali/datipersonali';

@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})

export class RegistrazionePage {
  loading: Loading;
  registerCredentials = { email: '', password_1: '', password_2: '', username: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, public loadingCtrl:LoadingController) { }

  public register() {
    this.loading = this.loadingCtrl.create({
      content: "Registrazione in corso...",
      dismissOnPageChange: true
    });

    this.loading.present();

    this.auth.register(this.registerCredentials).subscribe(
      success => {
        this.loading.dismiss();
        this.navCtrl.setRoot(DatipersonaliPage);
      },
      error => {
        this.loading.dismiss();
        let error_body;
        if(error._body) {
          error_body = error._body;
        }
        else {
          error_body = error;
        }
        this.showPopup("Attenzione", error_body);
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
