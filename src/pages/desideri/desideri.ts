import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { GruppoPage } from '../gruppo/gruppo';

@Component({
  selector: 'page-desideri',
  templateUrl: 'desideri.html',
})

export class DesideriPage {
  loading: Loading;
  gruppi: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento desideri..."
    });

    this.loading.present()

    let desideriPersonaliURL = this.URLVars.desideriPersonaliURL();

    this.http.get(desideriPersonaliURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.gruppi = data;
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );
  }

  getGruppo(gruppo) {
    this.navCtrl.push(GruppoPage, {gruppo: gruppo, gruppo_id : gruppo.id});
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
