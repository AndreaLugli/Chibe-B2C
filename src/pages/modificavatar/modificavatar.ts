import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { ProvinciaPage } from '../provincia/provincia';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@IonicPage()
@Component({
  selector: 'page-modificavatar',
  templateUrl: 'modificavatar.html',
})
export class ModificavatarPage {
  avatar: any;
  isDisabled: any;
  avatarPath: any;
  loading: Loading;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http, private camera: Camera, private crop: Crop, private transfer: FileTransfer) {
    this.isDisabled = true;
    this.avatar = navParams.get('avatar');
    if(!this.avatar) {
      this.avatar = "http://via.placeholder.com/500x500";
    }
  }

  public options: any = {
    allowEdit: true,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: this.camera.MediaType.ALLMEDIA,
    destinationType: this.camera.DestinationType.FILE_URI
  }

  public caricaAvatar() {
    this.isDisabled = false;
    this.camera.getPicture(this.options).then((fileUri) => {
      if (this.platform.is('ios')) {
        return fileUri
      } else if (this.platform.is('android')) {
        fileUri = 'file://' + fileUri;
        return this.crop.crop(fileUri, { quality: 100 });
      }
    }).then((path) => {
      this.avatar = path;
      return path;
    });
  }

  public indietro() {
    this.navCtrl.pop();
  }

  public salvaAvatar() {
    this.loading = this.loadingCtrl.create();

    this.loading.present();

    if(this.avatar != "http://via.placeholder.com/500x500") {
      let uploadPicURL = this.URLVars.uploadPicURL();

      let options: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'name.jpg',
         headers: {}
      }

      this.fileTransfer.upload(this.avatar, uploadPicURL, options).then((data) => {
         this.avatarPath = data.response;
         this.step2Function();
       }, (err) => {
         this.loading.dismiss();
         this.showPopup("Ops!", "Qualcosa è andato storto, riprova!");
       })
    }
  }

  step2Function () {
    let utenteStep2URL = this.URLVars.utenteStep2URL();

    let body = new URLSearchParams();
    body.append('avatar', this.avatarPath);

    this.http.post(utenteStep2URL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.showPopup("Perfetto!", "Avatar cambiato!");
      },
      error => {
        this.loading.dismiss();
        this.showPopup("Attenzione", error._body);
      }
    )
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
