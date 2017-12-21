import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';
import { IndexPage } from '../index/index';

import { App, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-confermatribu',
  templateUrl: 'confermatribu.html',
})

export class ConfermaTribuPage {
  loading: Loading;
  tribu: any;
  tribu_str: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController, public viewCtrl: ViewController, public appCtrl: App) {
    this.tribu = navParams.get('tribu');

    let currentDate = new Date();
    let nextMonth_val = currentDate.setMonth(currentDate.getMonth()+2);
    let nextMonth = new Date(nextMonth_val);

    let day = nextMonth.getDate();
    let monthIndex = nextMonth.getMonth() + 1;
    let year = nextMonth.getFullYear();

    this.data = day + "/" + monthIndex + "/" + year;

    this.tribu_str = "assets/profilo/" + this.tribu + ".png";

  }

  confermaTribu() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();
    let sceltaTribuURL = this.URLVars.sceltaTribuURL();

    let body = new URLSearchParams();
    body.append('tribu', this.tribu);

    this.http.post(sceltaTribuURL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.showPopupConfirm("Grazie!", "Tribù selezionata correttamente");
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    )

  }

  goToIndex() {
    this.viewCtrl.dismiss();
    //this.appCtrl.getRootNav().push(IndexPage);
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
        text: 'Torna alla Home',
        handler: data => {
          this.goToIndex()
        }
      }]
    });
    alert.present(prompt);
  }

}
