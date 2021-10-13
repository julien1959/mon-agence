import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  writeUserData() {
    const db = getDatabase();
    set(ref(db, 'propertise/'), this.properties);
    //set(ref(db, 'properties/'), this.properties);
  }

  getProperties(){

  }

  createProperty(property: Property){
    this.properties.push(property);
    this.writeUserData();
    this.emitProperties();
  }

  deleteProperty(index){
    this.properties.splice(index, 1);
    this.emitProperties();
  }

  updateProperty(property: Property, index){
    this.properties[index] = property;
    this.emitProperties();
  }
}
