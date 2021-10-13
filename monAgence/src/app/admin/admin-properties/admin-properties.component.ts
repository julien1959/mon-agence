import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PropertiesService} from 'src/app/services/properties.service';
import * as $ from 'jquery';
import {Modal} from 'bootstrap';
import {Property} from 'src/app/interfaces/property';


@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;
  indexToUpdate;
  editMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) {
  }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],    //Pour rendre le champ obligatoire
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: ''
    })
  }

  // Soumettre le formulaire
  onSubmitPropertiesForm() {
    const newProperty: Property = this.propertiesForm.value;
    if (this.editMode) {
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      this.propertiesService.createProperty(newProperty);
    }
    //$('#propertiesFormModal').modal('hide'); // Pour fermer la modal apres enregistrement du formulaire(avec jquery)
    //const truck_modal = document.querySelector('#propertiesFormModal');
    const modal = Modal.getInstance('#propertiesFormModal'); // Fermer la modal sans jquery
    modal.hide();
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.editMode = false;
    this.propertiesForm.reset();
  }

  onDeleteProperty(index) {
    //$('#deletePropertyModal').modal('show'); // Pour ouvrir la modal après suppression(avec jquery)
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    this.propertiesService.deleteProperty(this.indexToRemove);
    const modal = Modal.getInstance('#deletePropertyModal'); // Fermer la modal sans jquery
    modal.hide();
  }

  //Modification du bien
  onEditProperty(property: Property) {
    this.editMode = true;
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description);
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);

    // Récupérer l'index pour modification
    const index = this.properties.findIndex(e => e === property);
    this.indexToUpdate = index;
  }

}
