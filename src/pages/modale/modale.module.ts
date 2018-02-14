import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalePage } from './modale';

@NgModule({
  declarations: [
    ModalePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalePage),
  ],
})
export class ModalePageModule {}
