import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
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
  partners_original: any;
  title: any;
  showAlert: any;

  action: any;
  page: any;

  tribuSelected: any;
  combattutiSelected: any;
  newsSelected: any;
  promoSelected: any;
  viciniSelected: any;

  no_result:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.cerca_tutto();
    this.no_result = false;
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
    this.action = action;
    this.partners = [];
    this.page = 1;
    this.searchPartner(this.action, this.page);
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

  setFalseClass() {
    this.tribuSelected = false;
    this.combattutiSelected = false;
    this.newsSelected = false;
    this.promoSelected = false;
    this.viciniSelected = false;
  }

  cerca_tutto() {
    this.setFalseClass();

    this.title = "Conquista";

    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    this.geolocation.getCurrentPosition({timeout: 10000}).then((resp) => {
      this.loading.dismiss();
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.page = 1;
      this.action = "vicini";
      this.searchPartner(this.action, this.page);
      this.viciniSelected = true;

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
      alert("Sembra che il tuo GPS non sia attivo. Riprova");
    });
  }

  searchPartner(filtro, page) {
    this.no_result = false;
    let getPartners = this.URLVars.getPartners();

    let params = {
      latitude: this.latitude,
      longitude: this.longitude,
      order: filtro,
      page: page
    };

    this.http.get(getPartners, { params: params }).map(res => res.json()).subscribe(
      data => {
        if(this.partners) {

          if(data.length) {
            let tmp_p = this.partners;
            data.forEach(function(item, index) {
              tmp_p.push(item);
            });
            this.partners = tmp_p;
          }
          else {
            this.no_result = true;
          }

        } else {
          this.partners = data;
        }

        if(this.partners.length) {
          this.showAlert = false;
        }
        else {
          this.showAlert = true;
        }

      },
      error => {
        this.showPopup("Attenzione", error);
      }
    );
  }

  carica_altro() {
    this.page = this.page + 1;
    this.searchPartner(this.action, this.page);
  }

}
