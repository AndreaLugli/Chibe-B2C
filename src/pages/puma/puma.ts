import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfermaTribuPage } from '../confermatribu/confermatribu';

@Component({
  selector: 'page-puma',
  templateUrl: 'puma.html',
})

export class PumaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  scegliTribu() {
    let tribu = "puma";
    this.navCtrl.push(ConfermaTribuPage, {tribu: tribu});
  }

}
