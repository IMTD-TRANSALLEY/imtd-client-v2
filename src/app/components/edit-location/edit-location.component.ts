import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { GeocoderService } from 'src/app/services/geocoder.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocationService } from 'src/app/services/location.service';
import {
  LocationForm,
  EMPTY_LOCATION,
  sectors,
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
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
})
export class EditLocationComponent implements OnInit {
  private locationSubscription: Subscription;
  private paramMapSubscription: Subscription;

  readonly types = types;
  readonly sectors = sectors;
  readonly TYPE_ENTREPRISE = TYPE_ENTREPRISE;
  readonly TYPE_LABORATOIRE = TYPE_LABORATOIRE;
  readonly TYPE_FORMATION = TYPE_FORMATION;
  readonly TYPE_ASSOCIATION_INSTITUTION = TYPE_ASSOCIATION_INSTITUTION;

  formLocation: LocationForm = { ...EMPTY_LOCATION };
  locationId: string;
  isLoading: boolean = false;

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

  hasNewLogo: boolean = false;

  fileData: File = null;
  newLogo: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isLogoValid = false;
  logoURL: string;
  displayedLogo: any;

  formGeocoderQuery = ''; // geocoder query field
  geocoderResults = []; // geocoder query results

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private geocoderService: GeocoderService
  ) {}

  ngOnInit(): void {
    // this.location = { ...EMPTY_LOCATION };

    this.paramMapSubscription = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        // Check if route has id param
        if (paramMap.has('id')) {
          this.isLoading = true;
          this.locationId = paramMap.get('id');
          this.locationSubscription = this.locationService
            .getLocation(this.locationId)
            .subscribe(
              (res) => {
                this.isLoading = false;
                this.formLocation = res.data;
                console.log(this.formLocation);
                this.initForm();
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.resetForm();
  }

  initForm() {
    this.formLocation.sectors.forEach((sector) => {
      this.locationSectors.forEach((sec) => {
        if (sec.sectorText === sector) {
          this.selectedSectors.push(sec);
        }
      });
    });

    if (this.formLocation.type === TYPE_FORMATION) {
      this.formLocation.formationTypes.forEach((formationType) => {
        this.locationFormationTypes.forEach((ft) => {
          if (ft.formationTypesText === formationType) {
            this.selectedFormationTypes.push(ft);
          }
        });
      });

      this.formLocation.formationLevels.forEach((formationLevel) => {
        this.locationFormationLevels.forEach((fl) => {
          if (fl.formationLevelsText === formationLevel) {
            this.selectedFormationLevels.push(fl);
          }
        });
      });
    }

    this.logoURL = `${environment.imtdUploads}${this.formLocation.logo}`;
    this.displayedLogo = this.logoURL;
  }

  // onChangeType(type: string) {
  //   console.log(this.formLocation.type);
  //   // console.log(type);
  // }

  // onChangeSectors(sector: string) {
  //   if (this.formLocation.sectors.includes(sector)) {
  //     this.formLocation.sectors = this.location.sectors.filter(
  //       (el) => el !== sector
  //     );
  //   } else {
  //     this.location.sectors.push(sector);
  //   }
  //   console.log(this.location.sectors);
  // }

  // onClickRemoveSector(sector: string) {
  //   this.location.sectors = this.location.sectors.filter((el) => el !== sector);
  //   console.log(this.location.sectors);
  // }

  /************************ */
  uploadLogo(fileInput: any) {
    // Get first file from uploaded files
    this.fileData = <File>fileInput.target.files[0];

    // Check if mimeType matches image/..
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.newLogo = reader.result;
      this.hasNewLogo = true;
      this.isLogoValid = true;
    };
  }

  onClickRemoveNewLogo() {
    this.hasNewLogo = false;
  }

  onSubmit() {
    if (this.hasNewLogo) {
      console.log('has new logo');
      const formData = new FormData();
      formData.append('logo', this.fileData); // append the file to 'logo field' in request body

      console.log('Logo valid');
      this.locationService
        .updateLocationLogo(this.formLocation._id, formData)
        .subscribe(
          (res) => {
            // console.log('res');
            // console.log(res);
            this.formLocation = res.data;
            // console.log('this.formLocation');
            // console.log(this.formLocation);
            // console.log('Logo updated');
            this.updateLocation();
          },
          (err) => {
            alert('Erreur. Voir console');
            console.log(err);
          }
        );
    } else {
      this.updateLocation();
    }
  }

  updateLocation() {
    let errorMessage =
      'Formulaire non valide ! Il manque les informations suivantes :';
    let isValid = true;

    // if (this.selectedSectors.length > 0) {
    const sectors = [];
    this.selectedSectors.forEach((el) => sectors.push(el.sectorText));
    this.formLocation.sectors = sectors;
    // }

    // if (this.selectedFormationLevels.length > 0) {
    const formationLevels = [];
    this.selectedFormationLevels.forEach((el) =>
      formationLevels.push(el.formationLevelsText)
    );
    this.formLocation.formationLevels = formationLevels;
    // }

    // if (this.selectedFormationTypes.length > 0) {
    const formationTypes = [];
    this.selectedFormationTypes.forEach((el) =>
      formationTypes.push(el.formationTypesText)
    );
    this.formLocation.formationTypes = formationTypes;
    // }

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
      this.locationService.updateLocation(this.formLocation).subscribe(
        (res) => {
          console.log(res);
          alert('Succès de la modification');
          // this.router.navigate([`/locations/${this.formLocation._id}`]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
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
}
