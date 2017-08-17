import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AggiungiAmicoPage } from '../aggiungi-amico/aggiungi-amico';

@Component({
  selector: 'page-amici',
  templateUrl: 'amici.html',
})

export class AmiciPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  go_cerca() {
    this.navCtrl.push(AggiungiAmicoPage);
  }

}
