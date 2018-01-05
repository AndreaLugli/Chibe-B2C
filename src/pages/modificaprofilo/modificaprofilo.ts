import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, App, ViewController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { ProfiloPage } from '../profilo/profilo';
import { IndexPage } from '../index/index';

@Component({
  selector: 'page-modificaprofilo',
  templateUrl: 'modificaprofilo.html',
})

export class ModificaProfiloPage {
  loading: Loading;
  utente: any;
  descrizione: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController, public viewCtrl: ViewController, public appCtrl: App) {
    this.utente = navParams.get('utente');
    this.descrizione = this.utente.descrizione;
  }

  salvaDescrizione() {
    this.loading = this.loadingCtrl.create({
      content: "Salvataggio in corso...",
      dismissOnPageChange: true
    });

    this.loading.present();

    let modificaURL = this.URLVars.modificaURL();
    let body = new URLSearchParams();
    body.append('descrizione', this.descrizione);

    this.http.post(modificaURL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.showPopupConfirm("Grazie!", "Biografia modificata correttamente");
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    )
  }

  goToIndex() {
    //this.viewCtrl.dismiss();
    //this.appCtrl.getRootNav().push(ProfiloPage);
    this.appCtrl.getRootNav().push(IndexPage, { tabIndex: 3});
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showPopupConfirm(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'Torna al profilo',
        handler: data => {
          this.goToIndex()
        }
      }]
    });
    alert.present(prompt);
  }

}
