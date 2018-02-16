import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modale',
  templateUrl: 'modale.html',
})

export class ModalePage {
  sorgente: any;
  titolo: any;
  img_path: any;
  testo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.sorgente = this.navParams.get('sorgente');
    this.titolo = this.navParams.get('titolo');

    this.img_path = "assets/gif/" + this.sorgente + ".gif";

    if(this.sorgente == "acchiappasogni") {
      this.testo = "<h6>Questa è la sezione “Acchiappasogni”!<br> Qui trovi la lista di tutti i desideri.</h6>\
      Seleziona i desideri che preferisci e clicca il tasto “insegui desiderio”! Puoi condividere i desideri con i tuoi amici e vivere le esperienze insieme a loro! Nella descrizione troverai il loro valore in punti piuma e dove poterli riscattare. Inizia ora la tua avventura ed esaudisci i tuoi sogni!";
    }
    else if(this.sorgente == "conquista") {
      this.testo = "<h6>Questa è la sezione “Conquista”!<br> Qui trovi tutti i posti in cui guadagnare i Punti Piuma.</h6>\
      Mostra il Talismano alla cassa e ottieni subito i Punti Piuma utili per riscattare i tuoi desideri! Ricordati che se il locale è conquistato dalla tua tribù guadagnerai molti più punti, Parti alla conquista!";
    }
    else if(this.sorgente == "talismano") {
      this.testo = "<h6>Questa è il tuo “Talismano”!</h6>E’ la chiave per il raccogliere i tuoi Punti Piuma, mostralo alla cassa di un locale convenzionato con Chibe e aumenta il tuo bottino!";
    }
    else if(this.sorgente == "profilo") {
      this.testo = "<h6>Questo è il tuo Profilo utente!<br> Qui trovi i tuoi Punti Piuma, la tua tribù, e tutti i desideri che insegui.</h6>\
      Scegli a quale desiderio destinare i tuoi Punti Piuma e completa la barra per poter riscattare il tuo desiderio!";
    }
    else if(this.sorgente == "chibers") {
      this.testo = "<h6>Questa è la sezione “Chibers”!</h6> Qui puoi cercare tutti i tuoi amici, per ogni amico che inviti ottieni 100 punti piuma per te e per lui!<br>\
      Cosa aspetti? La tribù si sta muovendo in città";
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
