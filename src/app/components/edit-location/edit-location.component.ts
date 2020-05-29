import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { GeocoderService } from 'src/app/services/geocoder.service';
import { LocationService } from 'src/app/services/location.service';
import {
  LocationForm,
  EMPTY_LOCATION,
  sectors,
  types,
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
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

  location: LocationForm;
  locationId: string;
  isLoading: boolean = false;

  // selectedType = '';
  selectedSector = '';
  // selectedSectors = [];

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
    this.location = { ...EMPTY_LOCATION };

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
                this.location = res.data;
                console.log(this.location);

                this.logoURL = `${environment.imtdUploads}${this.location.logo}`;
                this.displayedLogo = this.logoURL;
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

  onChangeType(type: string) {
    console.log(this.location.type);
    // console.log(type);
  }

  onChangeSectors(sector: string) {
    if (this.location.sectors.includes(sector)) {
      this.location.sectors = this.location.sectors.filter(
        (el) => el !== sector
      );
    } else {
      this.location.sectors.push(sector);
    }
    console.log(this.location.sectors);
  }

  onClickRemoveSector(sector: string) {
    this.location.sectors = this.location.sectors.filter((el) => el !== sector);
    console.log(this.location.sectors);
  }

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
      const formData = new FormData();
      formData.append('logo', this.fileData); // append the file to 'logo field' in request body

      console.log('Logo valid');
      this.locationService
        .updateLocationLogo(this.location._id, formData)
        .subscribe(
          (res) => {
            console.log(this.location);
            console.log(res);
            console.log('Logo updated');
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
    this.locationService.updateLocation(this.location).subscribe(
      (res) => {
        console.log(res);
        alert('Succès de la modification');
        this.router.navigate([`/locations/${this.location._id}`]);
      },
      (err) => {
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
    this.location.street = geocoderLocation.properties.name;
    this.location.city = geocoderLocation.properties.city;
    this.location.postCode = geocoderLocation.properties.postcode;
    this.location.longitude = geocoderLocation.geometry.coordinates[0];
    this.location.latitude = geocoderLocation.geometry.coordinates[1];

    this.geocoderResults = [];
    this.formGeocoderQuery = '';
  }

  resetForm() {
    this.isLogoValid = false;
    this.geocoderResults = [];
  }
}
