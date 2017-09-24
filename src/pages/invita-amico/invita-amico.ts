import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-invita-amico',
  templateUrl: 'invita-amico.html',
})

export class InvitaAmicoPage {
  loading: Loading;
  urlInvite: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController, private socialSharing: SocialSharing) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let getInviteCodeURL = this.URLVars.getInviteCodeURL();

    this.http.get(getInviteCodeURL).map(res => res.json()).subscribe(
      data => {
        this.loading.dismiss();
        this.urlInvite = this.URLVars.urlInvite(data);
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
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

  share() {
    this.socialSharing.share("Invita un amico", "Invita un amico", [], this.urlInvite).then(() => {
      // Success!
    }).catch(() => {
      this.showPopup("Errore", "Ops, qualcosa è andato storto");
    });
  }

}
