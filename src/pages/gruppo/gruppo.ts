import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { UtentiGruppoPage } from '../utenti-gruppo/utenti-gruppo';

@Component({
  selector: 'page-gruppo',
  templateUrl: 'gruppo.html',
})

export class GruppoPage {
  loading: Loading;
  gruppo: any;
  gruppo_id: any;
  miei_punti: any;
  punti_piuma: any;
  codice_str: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController)  {
    this.gruppo = navParams.get('gruppo');
    this.gruppo_id = navParams.get('gruppo_id');
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getGruppoURL = this.URLVars.getGruppoURL(this.gruppo_id);

    this.http.get(getGruppoURL).map(res => res.json()).subscribe(
      data => {
        console.log(data)

        this.loading.dismiss();
        this.gruppo = data;
        this.miei_punti = data.miei_punti;

        this.codice_str = this.gruppo.codice_ordine;
        if (this.codice_str > 0) {
          this.codice_str = [this.codice_str.slice(0, 3), " ", this.codice_str.slice(3)].join('');
          this.codice_str = [this.codice_str.slice(0, 7), " ", this.codice_str.slice(7)].join('');
        }
      }
    );
  }

  aggiungiMembro() {
    this.navCtrl.push(UtentiGruppoPage, {id : this.gruppo.id});
  }

  invia_punti() {

    if(this.punti_piuma > 0) {
      if(this.punti_piuma > this.miei_punti) {
        alert("Non hai abbastanza punti");
      }
      else {
        this.loading = this.loadingCtrl.create();
        this.loading.present();

        let getGruppoURL = this.URLVars.getGruppoURL(this.gruppo_id);
        let body = new URLSearchParams();
        body.append('punti_piuma', this.punti_piuma);

        this.http.post(getGruppoURL, body).subscribe(
          data => {
            this.loading.dismiss();
            this.navCtrl.pop();
          }
        );
      }
    }
    else {
      alert("Inserire un valore positivo");
    }
  }

  riscatta_premio() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    let riscattaDesiderioURL = this.URLVars.riscattaDesiderioURL(this.gruppo_id);
    let body = new URLSearchParams();
    this.http.post(riscattaDesiderioURL, body).subscribe(
      data => {
        this.loading.dismiss();
        this.ionViewWillEnter()
      },
      err => {
        this.loading.dismiss();
        alert(err);
      }
    );
  }

  smetti_seguire() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    let smettiSeguireURL = this.URLVars.smettiSeguireURL(this.gruppo_id);
    let body = new URLSearchParams();
    this.http.post(smettiSeguireURL, body).subscribe(
      data => {
        this.loading.dismiss();
        this.navCtrl.pop();
      },
      err => {
        this.loading.dismiss();
        this.navCtrl.pop();
      }
    );
  }

}
