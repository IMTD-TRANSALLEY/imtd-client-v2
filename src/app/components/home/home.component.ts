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
import { compareCityName } from '../../utils/compare';
import {
  TYPE_ENTREPRISE,
  TYPE_FORMATION,
  TYPE_LABORATOIRE,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../../models/Location';
import { popupHTML } from 'src/app/utils/popup';

import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import * as L from 'leaflet';
// import { OverlappingMarkerSpiderfier } from '../../utils/overlapping';
// import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier';
import { environment } from './../../../environments/environment';

const FRONTEND_URL = `${environment.frontendURL}/locations`;

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
    idField: 'typeId',
    textField: 'typeText',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: false,
  };

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
    idField: 'distanceId',
    textField: 'distanceText',
    allowSearchFilter: false,
  };

  // City Singleselect
  locationCities = [...cities].sort(compareCityName);
  selectedCity = [];
  CityDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'cityId',
    textField: 'cityName',
    allowSearchFilter: false,
  };

  searchByDepartment: boolean = false;
  searchByArea: boolean = false;

  markers: L.LayerGroup;
  locations: any = [];

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

  map: L.Map;
  // var oms = new OverlappingMarkerSpiderfier(map);

  // popupText = 'Some popup text';

  laboratoireIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'assets/laboratoire.svg',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };
  associationIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'assets/institution.svg',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };
  entrepriseIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'assets/entreprise.svg',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };
  formationIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'assets/formation.svg',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };
  defaultIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'assets/marker.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };

  // iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',

  // mapURI =
  //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  // options = {
  //   layers: [
  //     L.tileLayer(this.mapURI, {
  //       maxZoom: 18,
  //       attribution: '',
  //       id: 'mapbox/streets-v11',
  //     }),
  //   ],
  //   zoom: 8,
  //   center: L.latLng(50, 3),
  // };
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 8,
    center: L.latLng(50.1, 3.5),
  };

  // oms: OverlappingMarkerSpiderfier;

  // markerClusterData: any;
  // markerClusterOptions = {
  //   showCoverageOnHover: true,
  //   zoomToBoundsOnClick: true,
  //   spiderfyOnMaxZoom: true,
  // };

  constructor(private locationService: LocationService) {}

  ngOnInit() {}

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
      this.selectedTypes.forEach((el) => types.push(el.typeText));
      params['type[in]'] = types.join(',');
    }

    // Construct sector[in] param
    if (this.selectedSectors.length > 0) {
      const sectors = [];
      this.selectedSectors.forEach((el) => sectors.push(el.sectorText));
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
        (el) => el.cityId === this.selectedCity[0].cityId
      );
      const distance = distances.filter(
        (el) => el.distanceId === this.selectedDistance[0].distanceId
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
        this.clearMarkers();
        this.locations = res.data;
        this.addMarkers();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onMapReady(map: L.Map) {
    this.map = map;
    this.onSubmit();
  }

  // initMarkers() {
  //   const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;

  //   L.marker([this.homeCoords.lat, this.homeCoords.lon], this.markerIcon)
  //     .addTo(this.map)
  //     .bindPopup(popupInfo);
  // }

  addMarkers() {
    const markers = [];

    /** OVERLAPPING TEST */
    // this.oms = new OverlappingMarkerSpiderfier(this.map);

    // this.markerClusterData = L.markerClusterGroup();
    this.locations.forEach((location) => {
      let marker;
      switch (location.type) {
        case TYPE_ENTREPRISE:
          marker = this.entrepriseIcon;
          break;
        case TYPE_FORMATION:
          marker = this.formationIcon;
          break;
        case TYPE_LABORATOIRE:
          marker = this.laboratoireIcon;
          break;
        case TYPE_ASSOCIATION_INSTITUTION:
          marker = this.associationIcon;
          break;

        default:
          marker = this.defaultIcon;
          break;
      }
      // const popupText = `${location.name} <a href="${FRONTEND_URL}/${location._id}">En savoir plus</a>`;
      const popupText = popupHTML(location);

      markers.push(
        L.marker([location.latitude, location.longitude], marker)
          // .addTo(this.map)
          .bindPopup(popupText)
      );
      // this.oms.addMarker(
      //   L.marker([location.latitude, location.longitude], marker)
      //     // .addTo(this.map)
      //     .bindPopup(popupText)
      // );
    });

    this.markers = L.layerGroup(markers);
    this.map.addLayer(this.markers);

    // this.markers = L.layerGroup(markers);
    // this.map.addLayer(this.markers);
  }

  clearMarkers() {
    if (this.map.hasLayer(this.markers)) {
      this.map.removeLayer(this.markers);
    }
    this.locations = [];
  }
}
