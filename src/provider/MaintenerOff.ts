import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/from';
import PouchDB from 'pouchdb';
import { File } from '@ionic-native/file';

declare var require: any;
PouchDB.plugin(require("./pouchdb.load"));

@Injectable()
export class ManteinerOffService {

    public db: any;
    public path: any;
    public handleError: any;
    public unit: string;

    constructor(private file: File) {
    }

    public criaDB(data, dbName) {
        var plainText = JSON.stringify(data);
        this.checkIfExists(this.file.externalRootDirectory + "MVTestes/", dbName + "form_safe.mv").then(result => {
            if (result) {
                this.file.removeFile(this.file.externalRootDirectory + "MVTestes",  dbName + "form_safe.mv")
            }
            this.file.createDir(this.file.externalRootDirectory, "MVTestes", true).then(() => {
                this.file.writeFile(this.file.externalRootDirectory + "MVTestes/",  dbName + "form_safe.mv", plainText);
                console.log("Dados salvos com sucesso!")
            });
        }).catch(res =>{
            this.file.createDir(this.file.externalRootDirectory, "MVTestes", true).then(() => {
                this.file.writeFile(this.file.externalRootDirectory + "MVTestes/",  dbName + "form_safe.mv", plainText);
                console.log("Dados salvos com sucesso!")
            });
        });
    }

    public checkIfExists(path, file) {
        return this.file.checkFile(path, file).then((res) => {
            return res;
        }).catch(err =>{
            return err;
        });
    }

    public getLocalData(dbName) {
        return this.file.readAsText(this.file.externalRootDirectory + "MVTestes/", dbName)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err)
            });
    }

    public getListFiles(){
        return this.file.listDir(this.file.externalRootDirectory, "MVTestes")
        .then(res =>{
            return res
        })
        .catch(err =>{
            return err;
        });
    }
}