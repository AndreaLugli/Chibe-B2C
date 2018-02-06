import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { PartnerPage } from '../partner/partner';

@Component({
  selector: 'page-conquista',
  templateUrl: 'conquista.html',
})

export class ConquistaPage {
  loading: Loading;

  title: any;
  gps_attivo: any;
  location_autorizzata: any;

  latitude: any;
  longitude: any;

  partners: any;
  filtro: any;
  tipo: any;

  tribuSelected: any;
  combattutiSelected: any;
  newsSelected: any;
  promoSelected: any;
  viciniSelected: any;

  constructor(private diagnostic: Diagnostic, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.title = "Conquista";
    this.partners = [];
  }

  ionViewWillEnter() {
    this.checkLocationEnabled();
  }

  checkLocationEnabled() {
    this.diagnostic.isLocationEnabled().then(
      (isAvailable) => {
        if(isAvailable) {
          this.gps_attivo = true;
          this.checkLocationAuthorization();
        }
        else {
          this.gps_attivo = false;
        }
      }
    ).catch(
      (e) => console.error(e)
    );
  }

  checkLocationAuthorization() {
    this.diagnostic.isLocationAuthorized().then(
      (authorized) => {
        if(authorized) {
          this.location_autorizzata = true;
          this.geolocation_base();
        }
        else {
          this.location_autorizzata = false;
          this.requestLocation();
        }
      }
    ).catch(
      (e) => console.error(e)
    );
  }

  requestLocation() {
    this.diagnostic.requestLocationAuthorization().then(
      (status) => {
        if(status == this.diagnostic.permissionStatus.GRANTED) {
          this.location_autorizzata = true;
          this.geolocation_base();
        }
        else if(status == this.diagnostic.permissionStatus.DENIED || status == this.diagnostic.permissionStatus.DENIED_ALWAYS) {
          this.location_autorizzata = false;
        }
      }
    ).catch(
      (e) => console.error(e)
    );
  }

  geolocation_base() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.filtro = "vicini";
      this.tipo = "ZERO";

      this.search();

    }).catch((error) => {
      console.log(error);
    });
  }

  search() {
    if(this.latitude) {
      this.loading = this.loadingCtrl.create({
        content: "Caricamento..."
      });

      this.loading.present();
      let getPartners = this.URLVars.getPartners();

      let params = {
        latitude: this.latitude,
        longitude: this.longitude,
        order: this.filtro,
        tipo: this.tipo
      };

      this.http.get(getPartners, { params: params }).map(res => res.json()).subscribe(
        data => {
          this.loading.dismiss();
          this.partners = data;
        },
        error => {
          this.showPopup("Attenzione", error);
        }
      );
    }
    else {
      this.geolocation_base();
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  info_parner(id_partner) {
    this.navCtrl.push(PartnerPage, {id_partner: id_partner});
  }

  onSelectChange(selectedValue: any) {
    this.tipo = selectedValue;
    this.search();
  }

  conquista_button(action) {
    this.setFalseClass();

    if(action == "tribu") {
      this.tribuSelected = true;
    }
    else if(action == "combattuti") {
      this.combattutiSelected = true;
    }
    else if(action == "news") {
      this.newsSelected = true;
    }
    else if(action == "promo") {
      this.promoSelected = true;
    }
    else if(action == "vicini") {
      this.viciniSelected = true;
    }

    this.filtro = action;
    this.search();
  }

  setFalseClass() {
    this.tribuSelected = false;
    this.combattutiSelected = false;
    this.newsSelected = false;
    this.promoSelected = false;
    this.viciniSelected = false;
  }

}
