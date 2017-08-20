import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfermaTribuPage } from '../confermatribu/confermatribu';

@Component({
  selector: 'page-volpi',
  templateUrl: 'volpi.html',
})

export class VolpiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  scegliTribu() {
    let tribu = "volpi";
    this.navCtrl.push(ConfermaTribuPage, {tribu: tribu});
  }

}
