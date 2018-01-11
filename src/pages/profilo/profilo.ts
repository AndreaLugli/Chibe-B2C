import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { TribuSceltaPage } from '../tribuscelta/tribuscelta';
import { ModificaProfiloPage } from '../modificaprofilo/modificaprofilo';
import { DesideriPage } from '../desideri/desideri';
import { ModificavatarPage } from '../modificavatar/modificavatar';
import { GruppoPage } from '../gruppo/gruppo';


@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})

export class ProfiloPage {
  loading: Loading;
  descrizione: any;
  avatar: any;
  username: any;
  tribu: any;
  tribu_str: any;
  pp: any;
  utente: any;
  modifica_tribu: any;
  title: any;
  nome: any;
  cognome: any;
  sesso: any;

  gruppi: any;
  cover: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public URLVars:URLVars, public http: Http, public loadingCtrl:LoadingController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.title = "Profilo";

    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });

    this.loading.present();

    let utenteInfoURL = this.URLVars.utenteInfoURL();

    this.http.get(utenteInfoURL).map(res => res.json()).subscribe(
      data => {

        console.log(data)

        this.loading.dismiss();
        this.descrizione = data.descrizione;
        this.username = data.username;
        this.pp = data.punti;
        this.utente = data;
        this.modifica_tribu = data.modifica_tribu;
        this.nome = data.nome;
        this.cognome = data.cognome;
        this.sesso = data.sesso;

        if(data.avatar) {
          this.avatar = "http://app.chibeapp.com" + data.avatar;
        }
        else {
          this.avatar = "assets/misc/default.png";
        }

        /* COVER DI DEFAULT */
        this.cover = "assets/cover/default.png";

        //this.tribu = "assets/tribudefault.png"

        if(data.tribu) {
          let sesso_path = "assets/cover/" + this.sesso + "/";

          this.tribu_str = "../assets/profilo/" + data.tribu + ".png";
          if (data.tribu == "orsi") {
            this.tribu = "assets/animali/orso.png";
            this.cover = sesso_path + "orsi.png";
          }
          else if(data.tribu == "aquile") {
            this.tribu = "assets/animali/aquila.png";
            this.cover = sesso_path + "aquile.png";
          }
          else if(data.tribu == "lupi") {
            this.tribu = "assets/animali/lupo.png";
            this.cover = sesso_path + "lupi.png";
          }
          else if(data.tribu == "puma") {
            this.tribu = "assets/animali/puma.png";
            this.cover = sesso_path + "puma.png";
          }
          else if(data.tribu == "volpi") {
            this.tribu = "assets/animali/volpe.png";
            this.cover = sesso_path + "volpi.png";
          }
        }

      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error);
      }
    );

    let desideriPersonaliURL = this.URLVars.desideriPersonaliURL();

    this.http.get(desideriPersonaliURL).map(res => res.json()).subscribe(
      data => {
        this.gruppi = data;
      }
    );


  }

  scegliTribu() {
    this.navCtrl.push(TribuSceltaPage);
  }

  modificaProfilo() {
    this.navCtrl.push(ModificaProfiloPage, {utente : this.utente});
  }

  modificaAvatar() {
    this.navCtrl.push(ModificavatarPage, {avatar : this.avatar});
  }

  listaDesideri() {
    this.navCtrl.push(DesideriPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  getGruppo(gruppo) {
    this.navCtrl.push(GruppoPage, {gruppo: gruppo, gruppo_id : gruppo.id});
  }

}
