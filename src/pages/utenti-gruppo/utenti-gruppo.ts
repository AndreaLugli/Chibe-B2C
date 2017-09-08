import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-utenti-gruppo',
  templateUrl: 'utenti-gruppo.html',
})

export class UtentiGruppoPage {
  loading: Loading;
  gruppo_id: any;
  nome: any;
  utenti_gruppo: any;
  amici: any;
  io: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController) {
    this.gruppo_id = navParams.get('id');
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getUtentiGruppoURL = this.URLVars.getUtentiGruppoURL(this.gruppo_id);
    this.http.get(getUtentiGruppoURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.utenti_gruppo = data.utenti;
        this.amici = data.amici;
        this.io = data.io;
      }
    );
  }

  addAmicoGruppo(amico) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let body = new URLSearchParams();
    body.append('amico_id', amico.id);

    let getUtentiGruppoURL = this.URLVars.getUtentiGruppoURL(this.gruppo_id);
    this.http.post(getUtentiGruppoURL, body).subscribe(
      data => {
        this.loading.dismiss();
        this.navCtrl.pop();
      }
    );
  }

}
