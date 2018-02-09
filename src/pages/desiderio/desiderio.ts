import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, App, ViewController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { IndexPage } from '../index/index';
import { GruppoPage } from '../gruppo/gruppo';

@Component({
  selector: 'page-desiderio',
  templateUrl: 'desiderio.html',
})

export class DesiderioPage {
  loading: Loading;
  id_desiderio:any
  desiderio: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController, public viewCtrl: ViewController, public appCtrl: App) {
    this.desiderio = [];
    this.id_desiderio = navParams.get('id_desiderio');

    this.loading = this.loadingCtrl.create({
      content: "Caricamento desideri..."
    });

    this.loading.present();

    let getDesiderioURL = this.URLVars.getDesiderioURL(this.id_desiderio);

    this.http.get(getDesiderioURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.desiderio = data;
      },
      error => {
        this.loading.dismiss();
        //this.showPopup("Attenzione", error);
      }
    );
  }

  seguiDesiderio() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getDesiderioURL = this.URLVars.getDesiderioURL(this.id_desiderio);
    let body = new URLSearchParams();

    this.http.post(getDesiderioURL, body).map(res => res.json()).subscribe(
      gruppo => {
        this.loading.dismiss();
        //this.navCtrl.push(GruppoPage, {gruppo: gruppo, gruppo_id : gruppo.id});
        this.appCtrl.getRootNav().push(IndexPage, { tabIndex: 3});
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    )

  }

  goToIndex() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(IndexPage);
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
        text: 'Torna alla Home',
        handler: data => {
          this.goToIndex()
        }
      }]
    });
    alert.present(prompt);
  }

}
