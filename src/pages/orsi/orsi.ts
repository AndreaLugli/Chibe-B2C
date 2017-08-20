import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfermaTribuPage } from '../confermatribu/confermatribu';

@Component({
  selector: 'page-orsi',
  templateUrl: 'orsi.html',
})
export class OrsiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  scegliTribu() {
    let tribu = "orsi";
    this.navCtrl.push(ConfermaTribuPage, {tribu: tribu});
  }

}
