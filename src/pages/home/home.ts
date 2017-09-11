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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

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
