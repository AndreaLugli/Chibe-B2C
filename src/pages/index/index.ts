import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TalismanoPage } from '../talismano/talismano';
import { AcchiappasogniPage } from '../acchiappasogni/acchiappasogni';
import { ConquistaPage } from '../conquista/conquista';
import { ProfiloPage } from '../profilo/profilo';
import { AmiciPage } from '../amici/amici';

@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {
  tab1Root = AcchiappasogniPage;
  tab2Root = ConquistaPage;
  tab3Root = TalismanoPage;
  tab4Root = ProfiloPage;
  tab5Root = AmiciPage;
  constructor() {}
}
