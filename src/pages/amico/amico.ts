import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-amico',
  templateUrl: 'amico.html',
})

export class AmicoPage {
  amico: any;
  punti_piuma: any;
  punti_personali: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.amico = navParams.get('amico');
    console.log(this.amico)

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getPuntiURL = this.URLVars.getPuntiURL();

    this.http.get(getPuntiURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.punti_personali = data;
      }
    );

  }

  invia_punti() {
    if(this.punti_piuma) {
      if(this.punti_piuma > this.punti_personali) {
        alert("Non hai abbastanza punti");
      }
      else {
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        let invitaPuntiURL = this.URLVars.invitaPuntiURL();

        let body = new URLSearchParams();
        body.append('punti', this.punti_piuma);
        body.append('amico_id', this.amico.id);

        this.http.post(invitaPuntiURL, body).subscribe(
          data => {
            this.loading.dismiss();
            this.navCtrl.pop();
          }
        );

      }
    }
    else {
      alert("Inserisci un valore");
    }
  }

  confirm_delete() {
    let confirm = this.alertCtrl.create({
      title: 'Attenzione',
      message: 'Vuoi davvero eliminare questo amico?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Si',
          handler: () => {
            let cancellaAmicoURL = this.URLVars.cancellaAmicoURL();

            let body = new URLSearchParams();
            body.append('id_amico', this.amico.id);

            this.http.post(cancellaAmicoURL, body).subscribe(
              data => {
                this.navCtrl.pop();
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

}
