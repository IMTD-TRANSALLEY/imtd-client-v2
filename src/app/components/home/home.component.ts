import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { typesWithID, sectorsWithID } from '../../models/Location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Types Multiselect
  locationTypes = typesWithID;
  selectedTypes = [];
  typeDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'type_id',
    textField: 'type_text',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  // Sectors Multiselect
  locationSectors = sectorsWithID;
  selectedSectors = [];
  sectorDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'sector_id',
    textField: 'sector_text',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.selectedTypes, this.selectedSectors);
  }
}
