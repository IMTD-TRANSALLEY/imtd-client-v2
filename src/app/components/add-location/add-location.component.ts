import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { GeocoderService } from 'src/app/services/geocoder.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  LocationForm,
  EMPTY_LOCATION,
  sectorsWithID,
  types,
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
  formationLevelsObjects,
  formationTypesObjects,
} from '../../models/Location';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  readonly types = types;
  readonly TYPE_ENTREPRISE = TYPE_ENTREPRISE;
  readonly TYPE_LABORATOIRE = TYPE_LABORATOIRE;
  readonly TYPE_FORMATION = TYPE_FORMATION;
  readonly TYPE_ASSOCIATION_INSTITUTION = TYPE_ASSOCIATION_INSTITUTION;

  formLocation: LocationForm = { ...EMPTY_LOCATION };

  // Sectors Multiselect
  locationSectors = sectorsWithID;
  selectedSectors = [];
  sectorDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'sectorId',
    textField: 'sectorText',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  // Formation Types Multiselect
  locationFormationTypes = formationTypesObjects;
  selectedFormationTypes = [];
  formationTypesDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'formationTypesId',
    textField: 'formationTypesText',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  // Formation Levels Multiselect
  locationFormationLevels = formationLevelsObjects;
  selectedFormationLevels = [];
  formationLevelsDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'formationLevelsId',
    textField: 'formationLevelsText',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  fileData: File = null;
  previewLogo: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isLogoValid = false;

  formGeocoderQuery = ''; // geocoder query field
  geocoderResults = []; // geocoder query results

  constructor(
    private locationService: LocationService,
    private geocoderService: GeocoderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(types, sectors);
    this.formLocation.type = '';
    this.formLocation.sectors = [];
    this.formLocation.name = 'Mobilité du futur';
    this.formLocation.shortName = 'MDF';
    this.formLocation.labCode = 'LAB0123';
    this.formLocation.street = "Rue de l'avenir";
    this.formLocation.postCode = '59300';
    this.formLocation.city = 'Valenciennes';
    this.formLocation.phone = '03 05 06 04 05';
    this.formLocation.website = 'www.test.com';
    this.formLocation.numbers = '49';
    this.formLocation.description = "Description de l' organisation";
    this.formLocation.logo = 'logo_default.jpg';
    this.formLocation.latitude = 51.534963;
    this.formLocation.longitude = 3.462845;
    this.formLocation.formationLevels = [];
    this.formLocation.formationTypes = [];
    this.formLocation.keywords = 'Le meilleur mot-clé ou la clef';
  }

  uploadLogo(fileInput: any) {
    // Get first file from uploaded files
    this.fileData = <File>fileInput.target.files[0];

    // Check if mimeType matches image/..
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.isLogoValid = true;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewLogo = reader.result;
    };
  }

  onSubmit() {
    let errorMessage =
      'Formulaire non valide ! Il manque les informations suivantes :';
    let isValid = true;

    if (this.selectedSectors.length > 0) {
      const sectors = [];
      this.selectedSectors.forEach((el) => sectors.push(el.sectorText));
      this.formLocation.sectors = sectors;
    }

    if (this.selectedFormationLevels.length > 0) {
      const formationLevels = [];
      this.selectedFormationLevels.forEach((el) =>
        formationLevels.push(el.formationLevelsText)
      );
      this.formLocation.formationLevels = formationLevels;
    }

    if (this.selectedFormationTypes.length > 0) {
      const formationTypes = [];
      this.selectedFormationTypes.forEach((el) =>
        formationTypes.push(el.formationTypesText)
      );
      this.formLocation.formationTypes = formationTypes;
    }

    if (this.formLocation.type === '') {
      errorMessage += '\n- un type';
      isValid = false;
    }
    if (this.formLocation.sectors.length === 0) {
      errorMessage += `\n- au minimum un secteur d'activité`;
      isValid = false;
    }
    if (this.formLocation.name === '') {
      errorMessage += `\n- un nom`;
      isValid = false;
    }
    if (this.formLocation.street === '') {
      errorMessage += `\n- une adresse`;
      isValid = false;
    }
    if (this.formLocation.postCode === '') {
      errorMessage += `\n- un code postal`;
      isValid = false;
    }
    if (this.formLocation.city === '') {
      errorMessage += `\n- une ville`;
      isValid = false;
    }
    if (this.formLocation.city === '') {
      errorMessage += `\n- une description`;
      isValid = false;
    }
    if (!this.formLocation.latitude) {
      errorMessage += `\n- une latitude`;
      isValid = false;
    }
    if (!this.formLocation.latitude) {
      errorMessage += `\n- une longitude`;
      isValid = false;
    }
    if (
      this.formLocation.type === TYPE_FORMATION &&
      this.formLocation.formationTypes.length === 0
    ) {
      errorMessage += `\n- au minimum un type de formation`;
      isValid = false;
    }
    if (
      this.formLocation.type === TYPE_FORMATION &&
      this.formLocation.formationLevels.length === 0
    ) {
      errorMessage += `\n- au minimum un niveau de formation`;
      isValid = false;
    }

    console.log(this.formLocation);

    if (!isValid) {
      alert(errorMessage);
    } else {
      alert('formulaire valide');
    }

    // const newLocation: LocationForm = {
    //   type: this.selectedType,
    //   sectors: this.selectedSectors,
    //   name: this.formName,
    //   // shortName:this.formShortName,
    //   street: this.formAddress,
    //   postCode: this.formPostCode,
    //   city: this.formCity,
    //   description: this.formDescription,
    //   logo: this.formLogo,
    //   latitude: this.formLatitude,
    //   longitude: this.formLongitutde,
    //   keywords: this.formKeywords,
    // };

    this.locationService.createLocation(this.formLocation).subscribe(
      (res) => {
        console.log(res);

        const id = res.data._id;
        const formData = new FormData();
        formData.append('logo', this.fileData); // append the file to 'logo field' in request body

        // If updated file is valid
        if (this.isLogoValid) {
          console.log('Logo valid');
          this.locationService.updateLocationLogo(id, formData).subscribe(
            (res) => {
              console.log(res);
              alert('Localisation avec logo ajoutée avec succès');
              this.router.navigate([`/locations/${id}`]);
            },
            (err) => {
              alert('Erreur. Voir console');
              console.log(err);
            }
          );
        } else {
          console.log('Logo invalid');
          alert('Localisation sans logo ajoutée avec succès');
          this.router.navigate([`/locations/${id}`]);
        }
      },
      (err) => {
        alert('Erreur. Voir console');
        console.log(err);
      }
    );
  }

  onClickGeocoder() {
    this.geocoderService.geocode(this.formGeocoderQuery).subscribe(
      (res) => {
        console.log(res);
        this.geocoderResults = res.features;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClickGeocoderLocation(geocoderLocation: any) {
    this.formLocation.street = geocoderLocation.properties.name;
    this.formLocation.city = geocoderLocation.properties.city;
    this.formLocation.postCode = geocoderLocation.properties.postcode;
    this.formLocation.longitude = geocoderLocation.geometry.coordinates[0];
    this.formLocation.latitude = geocoderLocation.geometry.coordinates[1];

    this.geocoderResults = [];
    this.formGeocoderQuery = '';
  }

  resetForm() {
    this.isLogoValid = false;
    this.geocoderResults = [];
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   this.http.post('url/to/your/api', formData).subscribe((res) => {
  //     console.log(res);
  //     this.uploadedFilePath = res.data.filePath;
  //     alert('SUCCESS !!');
  //   });
  // }

  // preview() {
  //   // Show preview
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewLogo = reader.result;
  //   };
  // }
}
