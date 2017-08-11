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
import { LoginPage } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';

import { AuthService } from '../providers/auth-service/auth-service';
import { URLVars } from '../providers/urls-var';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrazionePage,
    LoginPage,
    DatipersonaliPage,
    AvatarPage,
    ProvinciaPage,
    IndexPage
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
    LoginPage,
    DatipersonaliPage,
    AvatarPage,
    ProvinciaPage,
    IndexPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    URLVars,
    Camera,
    Crop,
    FileTransfer
  ]
})
export class AppModule {}
