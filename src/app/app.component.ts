import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { URLVars } from '../providers/urls-var';
import { Http } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { IndexPage } from '../pages/index/index';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TutorialPage;
  //rootPage:any = IndexPage;

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
    this.menuCtrl.close();
    this.rootPage = HomePage;
  }


  acchiappasogni() {
    this.menuCtrl.close();
    this.nav.setRoot(IndexPage, { tabIndex: 0});
  }

  conquista() {
    this.menuCtrl.close();
    this.nav.setRoot(IndexPage, { tabIndex: 1});
  }

  talismano() {
    this.menuCtrl.close();
    this.nav.setRoot(IndexPage, { tabIndex: 2});
  }

  profilo() {
    this.menuCtrl.close();
    this.nav.setRoot(IndexPage, { tabIndex: 3});
  }

  chibers() {
    this.menuCtrl.close();
    this.nav.setRoot(IndexPage, { tabIndex: 4});
  }

}
