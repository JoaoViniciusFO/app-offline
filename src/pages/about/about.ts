import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ManteinerOffService } from '../../provider/MaintenerOff';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public listFields: any[]
  public listFiles: any[]
  public content: any;

  constructor(public navCtrl: NavController,  private offService: ManteinerOffService) {
    this.listFields = [];
    this.listFiles = [];
    this.getListFields();
  }
  
  public getListFields() {
    this.offService.getListFiles()
    .then(res =>{
      this.listFiles = res; 
      console.log(res)
    });
  }
  getFields(file){
    this.offService.getLocalData(file)
    .then((res: string) =>{
      this.content = JSON.parse(res);
    });
  }

  setContent(cont){
    this.content = cont;
  }
}
