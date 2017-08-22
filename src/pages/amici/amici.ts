import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { AggiungiAmicoPage } from '../aggiungi-amico/aggiungi-amico';
import { AmicoPage } from '../amico/amico';

@Component({
  selector: 'page-amici',
  templateUrl: 'amici.html',
})

export class AmiciPage {
  loading: Loading;
  lista_amici: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    let getAmiciURL = this.URLVars.getAmiciURL();

    this.http.get(getAmiciURL).map(res => res.json()).subscribe(
      data => {
        this.lista_amici = data;
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );
  }

  amicoSelected(e) {
    this.navCtrl.push(AmicoPage, {amico: e});
  }

  removeAmico(e, amico_id) {
    let index = this.lista_amici.indexOf(e);

    if(index > -1){
      this.lista_amici.splice(index, 1);

      let cancellaAmicoURL = this.URLVars.cancellaAmicoURL();

      let body = new URLSearchParams();
      body.append('id_amico', amico_id);

      this.http.post(cancellaAmicoURL, body).subscribe();
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

  go_cerca() {
    this.navCtrl.push(AggiungiAmicoPage);
  }

}
