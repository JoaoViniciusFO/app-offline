import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ManteinerOffService } from '../../provider/MaintenerOff';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public form: any;

  constructor(public navCtrl: NavController, private offService: ManteinerOffService) {
    this.form = {};
  }

  save(){
    this.offService.criaDB(this.form, this.form.tipo)
  }
}
