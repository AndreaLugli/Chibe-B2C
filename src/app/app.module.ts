import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { DatipersonaliPage } from '../pages/datipersonali/datipersonali';
import { AvatarPage } from '../pages/avatar/avatar';
import { ProvinciaPage } from '../pages/provincia/provincia';

import { AuthService } from '../providers/auth-service/auth-service';
import { URLVars } from '../providers/urls-var';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrazionePage,
    DatipersonaliPage,
    AvatarPage,
    ProvinciaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrazionePage,
    DatipersonaliPage,
    AvatarPage,
    ProvinciaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    URLVars
  ]
})
export class AppModule {}
