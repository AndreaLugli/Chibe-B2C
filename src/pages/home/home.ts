import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { RegistrazionePage } from '../registrazione/registrazione';
import { LoginPage } from '../login/login';
import { DatipersonaliPage } from '../datipersonali/datipersonali';
import { AvatarPage } from '../avatar/avatar';
import { ProvinciaPage } from '../provincia/provincia';
import { IndexPage } from '../index/index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http) {
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
        console.log("Nope")
      }
    );
  }


  registrazione() {
    this.navCtrl.setRoot(RegistrazionePage);
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }

}
