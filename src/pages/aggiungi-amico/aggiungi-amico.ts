import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { InvitaAmicoPage } from '../invita-amico/invita-amico';

@Component({
  selector: 'page-aggiungi-amico',
  templateUrl: 'aggiungi-amico.html',
})

export class AggiungiAmicoPage {
  loading: Loading;
  amici: any;
  showAlert: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {}

  searchAmico(e) {

    if (e.length > 2) {
      this.loading = this.loadingCtrl.create({
        content: "Ricerca..."
      });

      this.loading.present();

      let searchAmicoURL = this.URLVars.searchAmicoURL();

      let params = {
        amico: e
      };

      this.http.get(searchAmicoURL, { params: params }).map(res => res.json()).subscribe(
        data => {
          if(data.length) {
            this.amici = data;
            this.showAlert = false;
          }
          else {
            this.showAlert = true;
          }

          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.showPopup("Attenzione", error);
        }
      );
    }
    else {
      this.showPopup("Ops!", "Per cercare gli altri chibers devi inserire almeno 3 caratteri!");
    }
  }

  addAmico(e, amico_id) {

    let aggiungiAmicoURL = this.URLVars.aggiungiAmicoURL();
    let body = new URLSearchParams();
    body.append('id_amico', amico_id);

    this.http.post(aggiungiAmicoURL, body).subscribe(
      success => {
        e.is_amico = true;
      }
    );


  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  invitaAmico() {
      this.navCtrl.push(InvitaAmicoPage);
  }

}
