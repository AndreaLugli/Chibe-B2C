import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-aggiungi-amico',
  templateUrl: 'aggiungi-amico.html',
})

export class AggiungiAmicoPage {
  loading: Loading;
  amici: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {}

  searchAmico(e) {
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
        console.log(data);
        this.amici = data;
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );
  }

  addAmico(amico_id) {
    alert(amico_id)
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
