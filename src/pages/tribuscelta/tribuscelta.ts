import { Component } from '@angular/core';
import { AquilePage } from '../aquile/aquile';
import { PumaPage } from '../puma/puma';
import { VolpiPage } from '../volpi/volpi';
import { OrsiPage } from '../orsi/orsi';
import { LupiPage } from '../lupi/lupi';

@Component({
  selector: 'page-tribuscelta',
  templateUrl: 'tribuscelta.html',
})

export class TribuSceltaPage {
  constructor() { }
  Tribu1 = AquilePage;
  Tribu2 = PumaPage;
  Tribu3 = VolpiPage;
  Tribu4 = OrsiPage;
  Tribu5 = LupiPage;
}
