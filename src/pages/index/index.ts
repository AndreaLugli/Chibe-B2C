import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TalismanoPage } from '../talismano/talismano';
import { AcchiappasogniPage } from '../acchiappasogni/acchiappasogni';
import { ConquistaPage } from '../conquista/conquista';
import { ProfiloPage } from '../profilo/profilo';
import { AmiciPage } from '../amici/amici';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

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

  constructor(private push: Push) {
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          alert('We have permission to send push notifications');
        } else {
          alert('We do not have permission to send push notifications');
        }
      });
  }
}
