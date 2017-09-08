import { Component } from '@angular/core';

import { TalismanoPage } from '../talismano/talismano';
import { AcchiappasogniPage } from '../acchiappasogni/acchiappasogni';
import { ConquistaPage } from '../conquista/conquista';
import { ProfiloPage } from '../profilo/profilo';
import { AmiciPage } from '../amici/amici';

import { Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';

@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {
  sistema_operativo: any;
  token: any;

  tab1Root = AcchiappasogniPage;
  tab2Root = ConquistaPage;
  tab3Root = TalismanoPage;
  tab4Root = ProfiloPage;
  tab5Root = AmiciPage;

  constructor(private push: Push, public plt: Platform, public URLVars:URLVars, public http: Http) {

    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });

      const options: PushOptions = {
         android: {
             senderID: '551471137799'
         },
         ios: {
             alert: 'true',
             badge: true,
             sound: 'false'
         },
         windows: {}
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      pushObject.on('registration').subscribe(
        (registration: any) => {
          this.token = registration.registrationId;

          if (this.plt.is('ios')) {
            this.sistema_operativo = "iOS";
          }

          if(this.plt.is('android')) {
            this.sistema_operativo = "Android";
          }
          
          let registraTokenURL = this.URLVars.registraTokenURL();
          let body = new URLSearchParams();
          body.append('token', this.token);
          body.append('sistema_operativo', this.sistema_operativo);

          this.http.post(registraTokenURL, body).subscribe();

        }
      );

  }
}
