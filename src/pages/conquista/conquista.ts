import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import { PartnerPage } from '../partner/partner';

@Component({
  selector: 'page-conquista',
  templateUrl: 'conquista.html',
})

export class ConquistaPage {
  loading: Loading;
  latitude: any;
  longitude: any;
  partners: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.title = "Conquista";

    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loading.dismiss();
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let getPartners = this.URLVars.getPartners();

      let params = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      this.http.get(getPartners, { params: params }).map(res => res.json()).subscribe(
        data => {
          this.partners = data;
        },
        error => {
          this.showPopup("Attenzione", error);
        }
      );

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });

  }

  info_parner(id_partner) {
    this.navCtrl.push(PartnerPage, {id_partner: id_partner});
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
