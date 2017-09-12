import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatiFbPage } from './dati-fb';

@NgModule({
  declarations: [
    DatiFbPage,
  ],
  imports: [
    IonicPageModule.forChild(DatiFbPage),
  ],
})
export class DatiFbPageModule {}
