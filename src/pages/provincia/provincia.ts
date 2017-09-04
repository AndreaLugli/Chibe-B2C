import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { IndexPage } from '../index/index';

@Component({
  selector: 'page-provincia',
  templateUrl: 'provincia.html',
})

export class ProvinciaPage {
  loading: Loading;
  province: any;
  provincia: any;
  scuole: any;
  scuola: any;
  isEnabledScuola: any;
  classe: any;
  privacy: boolean;
  newsletter: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    /*
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();
    */

    let provinceURL = this.URLVars.provinceURL();

    this.http.get(provinceURL).map(res => res.json()).subscribe(
      data => {
        //this.loading.dismiss();
        this.province = data;
      },
      error => {
        //this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );
  }

  onSelectChange(selectedValue: any) {
    let provinciaIDURL = this.URLVars.provinciaIDURL(selectedValue);

    this.provincia = selectedValue;

    this.loading = this.loadingCtrl.create({
      content: "Caricamento...",
      dismissOnPageChange: true
    });

    this.loading.present();

    this.http.get(provinciaIDURL).map(res => res.json()).subscribe(
      data => {
        this.isEnabledScuola = false;
        this.loading.dismiss();
        this.scuole = data;
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    );

  }

  onSelectScuolaChange(scuolaId: any) {
    this.scuola = scuolaId;
  }

  completaStepTre() {

    if(this.provincia && this.scuola && this.privacy) {

      /*
      this.loading = this.loadingCtrl.create({
        content: "Caricamento...",
        dismissOnPageChange: true
      });

      this.loading.present();
      */

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = new URLSearchParams();
      body.append('provincia_id', this.provincia);
      body.append('scuola_id', this.scuola);
      body.append('classe', this.classe);

      if(this.newsletter) {
        body.append('newsletter', "True");
      }

      let utenteStep3URL =  this.URLVars.utenteStep3URL();

      this.http.post(utenteStep3URL, body).subscribe(
        success => {
          //this.loading.dismiss();
          this.navCtrl.setRoot(IndexPage);
        },
        error => {
          //this.loading.dismiss();
          this.showPopup("Attenzione", error._body);
        }
      );


    }
    else {
      if(!this.provincia) {
        this.showPopup("Attenzione", "Selezionare una provincia");
      }
      else if(!this.scuola) {
        this.showPopup("Attenzione", "Selezionare una scuola");
      }
      else if(!this.privacy) {
        this.showPopup("Attenzione", "Accettare la privacy policy e i termini di servizio per continuare");
      }
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

}
