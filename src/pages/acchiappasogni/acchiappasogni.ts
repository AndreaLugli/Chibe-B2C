import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { DesiderioPage } from '../desiderio/desiderio';
import { NontroviPage } from '../nontrovi/nontrovi';

@Component({
  selector: 'page-acchiappasogni',
  templateUrl: 'acchiappasogni.html',
})

export class AcchiappasogniPage {
  loading: Loading;
  desideri: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.title = "Acchiappasogni";

    this.loading = this.loadingCtrl.create({
      content: "Caricamento desideri..."
    });

    this.loading.present();

    let desideriURL = this.URLVars.desideriURL2();

    this.http.get(desideriURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.desideri = data;
        console.log(data)
      },
      error => {
        this.loading.dismiss();
        //this.showPopup("Attenzione", error);
      }
    );


  }

  openDesiderio(id_desiderio) {
    this.navCtrl.push(DesiderioPage, {id_desiderio:id_desiderio});
  }

  openNontrovi() {
    this.navCtrl.push(NontroviPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  comunicaDesiderio() {
    this.showPopup("Non trovi il desiderio?", "<a target='_blank' href='https://api.whatsapp.com/send?phone=393394198803'>Comunicacelo</a>");
  }



}
