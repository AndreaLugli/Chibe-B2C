import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegistrazionePage } from '../registrazione/registrazione';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) { }

  registrazione() {
    this.navCtrl.setRoot(RegistrazionePage);
  }

}
