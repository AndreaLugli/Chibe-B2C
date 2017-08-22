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
import { TalismanoPage } from '../pages/talismano/talismano';
import { AcchiappasogniPage } from '../pages/acchiappasogni/acchiappasogni';
import { ConquistaPage } from '../pages/conquista/conquista';
import { ProfiloPage } from '../pages/profilo/profilo';
import { AmiciPage } from '../pages/amici/amici';
import { PartnerPage } from '../pages/partner/partner';
import { AggiungiAmicoPage } from '../pages/aggiungi-amico/aggiungi-amico';
import { TribuSceltaPage } from '../pages/tribuscelta/tribuscelta';
import { AquilePage } from '../pages/aquile/aquile';
import { PumaPage } from '../pages/puma/puma';
import { VolpiPage } from '../pages/volpi/volpi';
import { OrsiPage } from '../pages/orsi/orsi';
import { LupiPage } from '../pages/lupi/lupi';
import { ConfermaTribuPage } from '../pages/confermatribu/confermatribu';
import { ModificaProfiloPage } from '../pages/modificaprofilo/modificaprofilo'
import { DesideriPage } from '../pages/desideri/desideri';
import { DesiderioPage } from '../pages/desiderio/desiderio';
import { AmicoPage } from '../pages/amico/amico';

import { AuthService } from '../providers/auth-service/auth-service';
import { URLVars } from '../providers/urls-var';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FileTransfer } from '@ionic-native/file-transfer';
import { QRCodeModule } from 'angular2-qrcode';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrazionePage,
    LoginPage,
    DatipersonaliPage,
    AvatarPage,
    ProvinciaPage,
    IndexPage,
    TalismanoPage,
    AcchiappasogniPage,
    ConquistaPage,
    ProfiloPage,
    AmiciPage,
    PartnerPage,
    AggiungiAmicoPage,
    TribuSceltaPage,
    AquilePage,
    PumaPage,
    VolpiPage,
    OrsiPage,
    LupiPage,
    ConfermaTribuPage,
    ModificaProfiloPage,
    DesideriPage,
    DesiderioPage,
    AmicoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    QRCodeModule
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
    IndexPage,
    TalismanoPage,
    AcchiappasogniPage,
    ConquistaPage,
    ProfiloPage,
    AmiciPage,
    PartnerPage,
    AggiungiAmicoPage,
    TribuSceltaPage,
    AquilePage,
    PumaPage,
    VolpiPage,
    OrsiPage,
    LupiPage,
    ConfermaTribuPage,
    ModificaProfiloPage,
    DesideriPage,
    DesiderioPage,
    AmicoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    URLVars,
    Camera,
    Crop,
    FileTransfer,
    Geolocation
  ]
})
export class AppModule {}
