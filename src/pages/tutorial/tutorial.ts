import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

import { IndexPage } from '../index/index';
import { HomePage } from '../home/home';
import { DatipersonaliPage } from '../datipersonali/datipersonali';
import { AvatarPage } from '../avatar/avatar';
import { ProvinciaPage } from '../provincia/provincia';

@Component({
  selector: 'tutorial',
  templateUrl: 'tutorial.html',
})

export class TutorialPage {

constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http) {

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
      console.log("Nope");
    }
  );
}

  @ViewChild(Slides) slides: Slides;


  nextSlide() {
    this.slides.slideNext(500);
  }

  inizia() {
    this.navCtrl.setRoot(HomePage);
  }

}
