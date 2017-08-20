import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfermaTribuPage } from '../confermatribu/confermatribu';

@Component({
  selector: 'page-lupi',
  templateUrl: 'lupi.html',
})

export class LupiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  scegliTribu() {
    let tribu = "lupi";
    this.navCtrl.push(ConfermaTribuPage, {tribu: tribu});
  }

}
