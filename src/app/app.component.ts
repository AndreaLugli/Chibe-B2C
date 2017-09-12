import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { URLVars } from '../providers/urls-var';
import { Http } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { IndexPage } from '../pages/index/index';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { DatiFbPage } from '../pages/dati-fb/dati-fb';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TutorialPage;
  //rootPage:any = DatiFbPage;

  constructor(public menuCtrl: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public URLVars:URLVars, public http: Http) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout() {
    let logoutURL = this.URLVars.logoutURL();

    this.http.get(logoutURL).subscribe(
      data => {
        this.menuCtrl.close();
        this.rootPage = HomePage;
      },
      error => {
        this.menuCtrl.close();
        this.rootPage = HomePage;
      }
    );
  }
}
