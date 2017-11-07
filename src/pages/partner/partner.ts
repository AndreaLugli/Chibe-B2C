import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html',
})

export class PartnerPage {
  loading: Loading;
  id_partner: any;

  ragione_sociale: any;
  foto: any;
  descrizione: any;
  telefono: any;
  indirizzo: any;
  tribu: any;
  percentuale: any;

  tribu_1: any;
  tribu_2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
    this.id_partner = navParams.get('id_partner');

    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    let getPartner = this.URLVars.getPartner(this.id_partner);

    this.http.get(getPartner).map(res => res.json()).subscribe(
      data => {
        this.ragione_sociale = data.ragione_sociale;
        this.foto = data.foto;
        this.descrizione = data.descrizione;
        this.telefono = data.telefono;
        this.indirizzo = data.indirizzo;
        this.tribu = data.tribu;
        this.percentuale = data.percentuale;
        this.loading.dismiss();

        this.tribu_1 = this.get_picture(data.tribu_1);

      },
      error => {
        this.showPopup("Attenzione", error);
        this.loading.dismiss();
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

  get_picture(tribu) {
    if(tribu == "volpi") {
      return 'assets/animali/volpi.png';
    }
    else if(tribu == "puma") {
      return 'assets/animali/puma.png';
    }
    else if(tribu == "lupi") {
      return 'assets/animali/lupo.png';
    }
    else if(tribu == "aquile") {
      return 'assets/animali/aquila.png';
    }
    else if(tribu == "orsi") {
      return 'assets/animali/orso.png';
    }
    else {
      return 'http://via.placeholder.com/100x100';
    }
  }

}
