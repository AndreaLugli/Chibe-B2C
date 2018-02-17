import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { Brightness } from '@ionic-native/brightness';
import { Storage } from '@ionic/storage';
import { ModalePage } from '../modale/modale';


@Component({
  selector: 'page-talismano',
  templateUrl: 'talismano.html',
})

export class TalismanoPage {
  loading: Loading;
  codice: any;
  codice_str: any;
  background: any;
  foreground: any;
  title: any;
  screen_width: any;
  screen_height: any;
  screen_height_2: any;

  constructor(private storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController, private brightness: Brightness) {

    this.screen_width = ((window.screen.width/2) - 75 - 15) + "px";
    this.screen_height = ((window.screen.width/2) - 75 - 55) + "px";
    this.screen_height_2 = ((window.screen.width/2) - 60) + "px";

    this.background = "white";
    this.foreground = "black";
    this.title = "Talismano";

     storage.get('codice').then((val) => {
       if(val) {
         this.codice_str = val;
         this.codice_str = [this.codice_str.slice(0, 3), " ", this.codice_str.slice(3)].join('');
         this.codice_str = [this.codice_str.slice(0, 7), " ", this.codice_str.slice(7)].join('');
       }
       else {
         this.loading = this.loadingCtrl.create();
         this.loading.present();

         let getCodeURL = this.URLVars.getCodeURL();

         this.http.get(getCodeURL).subscribe(
           data => {
             this.loading.dismiss();
             this.codice = data.text();
             storage.set('codice', this.codice);
             this.codice_str = this.codice;
             this.codice_str = [this.codice_str.slice(0, 3), " ", this.codice_str.slice(3)].join('');
             this.codice_str = [this.codice_str.slice(0, 7), " ", this.codice_str.slice(7)].join('');
           },
           error => {
             this.loading.dismiss();
           }
         );
       }
     });

    this.brightness.setBrightness(1);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  openModalInfo() {
    let modal = this.modalCtrl.create(ModalePage, {'sorgente' : 'talismano', 'titolo' : this.title});
    modal.present();
  }

}
