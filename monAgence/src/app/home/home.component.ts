import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { Property } from '../interfaces/property';
import {PropertiesService} from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties = [];
  propertiesSubscription: Subscription;

  constructor(
    private propertiesService: PropertiesService
  ) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.propertiesService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.properties = data ;
      },
      error => {
        console.log(error);
      }
    )
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}
