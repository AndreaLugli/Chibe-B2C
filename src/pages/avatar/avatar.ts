import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { URLVars } from '../../providers/urls-var';
import 'rxjs/add/operator/map';

import { ProvinciaPage } from '../provincia/provincia';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})

export class AvatarPage {
  loading: Loading;
  path: any;
  avatarPath: any;
  isDisabled: any;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl:LoadingController, public URLVars:URLVars, public http: Http, private camera: Camera, private crop: Crop, private transfer: FileTransfer) {
    this.path = "assets/misc/default.png";
    this.isDisabled = true;
  }

  public salvaAvatar() {
    this.loading = this.loadingCtrl.create();

    this.loading.present();

    if(this.path != "assets/misc/default.png") {
      let uploadPicURL = this.URLVars.uploadPicURL();

      let options: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'name.jpg',
         headers: {}
      }

      this.fileTransfer.upload(this.path, uploadPicURL, options).then((data) => {
         this.avatarPath = data.response;
         this.step2Function();
       }, (err) => {
         this.loading.dismiss();
         this.showPopup("Ops!", "Qualcosa è andato storto, riprova!");
       })
    }
    else {
      this.step2Function();
    }
  }

  step2Function () {
    let utenteStep2URL = this.URLVars.utenteStep2URL();

    let body = new URLSearchParams();
    body.append('avatar', this.avatarPath);

    this.http.post(utenteStep2URL, body).subscribe(
      success => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ProvinciaPage);
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
      this.path = path;
      return path;
    });


  }

}
