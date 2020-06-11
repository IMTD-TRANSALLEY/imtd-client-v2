import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  typesWithID,
  sectorsWithID,
  departments,
  distances,
  cities,
} from '../../models/Location';
import { LocationService } from 'src/app/services/location.service';

import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import * as L from 'leaflet';

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

  // Deparments Multiselect
  locationDepartments = departments;
  selectedDepartments = [];
  DepartmentDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'departmentCode',
    textField: 'departmentName',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

  // Distance Singleselect
  locationDistances = distances;
  selectedDistance = [];
  DistanceDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'distanceID',
    textField: 'distanceText',
    allowSearchFilter: false,
  };

  // City Singleselect
  locationCities = cities;
  selectedCity = [];
  CityDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'cityID',
    textField: 'cityName',
    allowSearchFilter: false,
  };

  searchByDepartment: boolean = false;
  searchByArea: boolean = false;

  /**
   * Leaflet
   */
  // options = {
  //   layers: [
  //     tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 18,
  //       attribution: '...',
  //     }),
  //   ],
  //   zoom: 5,
  //   center: latLng(46.879966, -121.726909),
  // };

  // layer = marker([46.879966, -121.726909], {
  //   icon: icon({
  //     iconSize: [35, 35],
  //     iconAnchor: [13, 41],
  //     iconUrl: 'assets/marker.png',
  //     // shadowUrl: 'assets/marker2.png',
  //   }),
  // })
  //   .on('click', () => {
  //     console.log('click');
  //   })
  //   .bindPopup('<p>' + 'Hello' + '</p>');

  map;
  homeCoords = {
    lat: 23.810331,
    lon: 90.412521,
  };

  popupText = 'Some popup text';

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 5,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon),
  };

  initMarkers() {
    const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;

    L.marker([this.homeCoords.lat, this.homeCoords.lon], this.markerIcon)
      .addTo(this.map)
      .bindPopup(popupInfo);
  }

  constructor(private locationService: LocationService) {}

  ngOnInit() {}

  onMapReady(map: L.Map) {
    this.map = map;
    // Do stuff with map
    this.initMarkers();
  }

  onSelectSearchByDepartment() {
    if (this.searchByArea !== this.searchByDepartment) {
      this.searchByArea = !this.searchByArea;
    }
    this.searchByDepartment = !this.searchByDepartment;
  }

  onSelectSearchByArea() {
    if (this.searchByArea !== this.searchByDepartment) {
      this.searchByDepartment = !this.searchByDepartment;
    }
    this.searchByArea = !this.searchByArea;
  }

  onSubmit() {
    console.log(this.selectedTypes, this.selectedSectors);

    // Query parameter object
    const params = {};

    // Construct type[in] param
    if (this.selectedTypes.length > 0) {
      const types = [];
      this.selectedTypes.forEach((el) => types.push(el.type_text));
      params['type[in]'] = types.join(',');
    }

    // Construct sector[in] param
    if (this.selectedSectors.length > 0) {
      const sectors = [];
      this.selectedSectors.forEach((el) => sectors.push(el.sector_text));
      params['sectors[in]'] = sectors.join(',');
    }

    // Construct departmentName[in] param
    if (this.searchByDepartment && this.selectedDepartments.length > 0) {
      const departments = [];
      this.selectedDepartments.forEach((el) =>
        departments.push(el.departmentName)
      );
      params['departmentName[in]'] = departments.join(',');
    }

    // Construct position param
    if (
      this.searchByArea &&
      this.selectedDistance.length > 0 &&
      this.selectedCity.length > 0
    ) {
      // console.log(this.selectedDistance);
      // console.log(this.selectedCity);

      const city = cities.filter(
        (el) => el.cityID === this.selectedCity[0].cityID
      );
      const distance = distances.filter(
        (el) => el.distanceID === this.selectedDistance[0].distanceID
      );

      // console.log(city);
      // console.log(distance);

      const position = `${distance[0].distanceValue},${city[0].cityLatitude},${city[0].cityLongitude}`;
      params['position'] = position;
    }

    console.log(params);

    this.locationService.getLocations(params).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
