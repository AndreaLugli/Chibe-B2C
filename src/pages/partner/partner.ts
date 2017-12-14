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
  banner: any;
  descrizione: any;
  telefono: any;
  indirizzo: any;
  tribu: any;
  tribu_pic:any;
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
        this.banner = data.banner;
        this.descrizione = data.descrizione;
        this.telefono = data.telefono;
        this.indirizzo = data.indirizzo;
        this.tribu = data.tribu;
        this.percentuale = data.percentuale;
        this.loading.dismiss();

        this.tribu_1 = this.get_picture(data.tribu_1);
        this.tribu_2 = this.get_picture(data.tribu_2);

        if (data.tribu == "orsi") {
          this.tribu_pic = "assets/animali/orso.png"
        }
        else if(data.tribu == "aquile") {
          this.tribu_pic = "assets/animali/aquila.png"
        }
        else if(data.tribu == "lupi") {
          this.tribu_pic = "assets/animali/lupo.png"
        }
        else if(data.tribu == "puma") {
          this.tribu_pic = "assets/animali/puma.png"
        }
        else if(data.tribu == "volpi") {
          this.tribu_pic = "assets/animali/volpe.png"
        }
        else {
          this.tribu_pic = "http://via.placeholder.com/100x100";
        }


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
