import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfermaTribuPage } from '../confermatribu/confermatribu';

@Component({
  selector: 'page-aquile',
  templateUrl: 'aquile.html',
})

export class AquilePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  scegliTribu() {
    let tribu = "aquile";
    this.navCtrl.push(ConfermaTribuPage, {tribu: tribu});
  }


}
