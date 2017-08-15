import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-conquista',
  templateUrl: 'conquista.html',
})

export class ConquistaPage {
  loading: Loading;
  latitude: any;
  longitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public loadingCtrl:LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loading.dismiss();
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });

  }


}
