import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  typesWithID,
  sectorsWithID,
  departments,
  distances,
  cities,
  LocationForm,
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
import { getIcon } from '../../utils/getIcon';

import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import * as L from 'leaflet';
import * as HDF from '../../utils/HautsDeFranceGeojson';

import { environment } from './../../../environments/environment';

const FRONTEND_URL = `${environment.frontendURL}/locations`;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  /**
   * Form Attributes
   */
  searchByDepartment: boolean = false;
  searchByArea: boolean = false;

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

  /**
   * Map attributes
   */
  map: L.Map;

  // Map options
  options = {
    layers: [
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 16,
          // minZoom: 13,
          attribution: '',
        }
      ),
    ],
    zoom: 8,
    center: L.latLng(50, 2.8),
  };

  departmentsPolygons: any = [];
  departmentsLayerGroup: L.LayerGroup;

  locations: LocationForm[] = []; // data
  activeLocations: LocationForm[] = []; // displayed locations
  selectedLocation: LocationForm;

  markers: any = []; // markers
  activeMarkers: any = []; // displayed markers
  selectedMarker: L.Marker;

  markersLayerGroup: L.LayerGroup; // layer group of markers
  activeMarkersLayerGroup: L.LayerGroup; // displayed layer group of markers
  selectedMarkerLayerGroup: L.LayerGroup;

  markerClusterData: any[] = [];
  markerClusterGroup = L.markerClusterGroup({});
  markerClusterOptions: L.MarkerClusterGroupOptions = {
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    polygonOptions: {
      weight: 1.0,
      color: '#007e42',
      opacity: 0.5,
      fill: true,
      fillColor: '#007e42',
      fillOpacity: 0.2,
    },
    spiderfyOnMaxZoom: true,
    iconCreateFunction: function (cluster) {
      return L.divIcon({
        className: 'cluster-icon',
        iconSize: [40, 40],
        html: `${cluster.getChildCount()}`,
      });
    },
  };

  // Icons
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

        // this.addMarkers();
        this.refreshMap();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onMapReady(map: L.Map) {
    this.map = map;
    const style = {
      color: '#0094af',
      weight: 1,
      fillColor: '#0094af',
      fillOpacity: 0.05,
    };

    new L.GeoJSON(HDF.Somme, { style: style }).addTo(map);
    new L.GeoJSON(HDF.Aisne, { style: style }).addTo(map);
    new L.GeoJSON(HDF.Nord, { style: style }).addTo(map);
    new L.GeoJSON(HDF.Oise, { style: style }).addTo(map);
    new L.GeoJSON(HDF.PasDeCalais, { style: style }).addTo(map);

    this.map.on('moveend', (event) => {
      this.refreshMap();
    });
    this.map.on('zoomend', (event) => {
      // console.log(event);
      this.refreshMap();
    });
    this.onSubmit();
  }

  markerClusterReady(markerCluster: L.MarkerClusterGroup) {
    this.markersLayerGroup = markerCluster;
  }

  refreshMap() {
    const mapBounds = this.map.getBounds();

    // remove layers
    // if (this.map.hasLayer(this.markersLayerGroup))
    //   this.map.removeLayer(this.markersLayerGroup);
    if (this.map.hasLayer(this.activeMarkersLayerGroup))
      this.map.removeLayer(this.activeMarkersLayerGroup);

    this.activeMarkers = [];
    this.activeLocations = [];

    setInterval(() => {}, 1);

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

      const popupText = popupHTML(location);

      if (
        location.latitude <= mapBounds.getNorth() &&
        location.latitude >= mapBounds.getSouth() &&
        location.longitude >= mapBounds.getWest() &&
        location.longitude <= mapBounds.getEast()
      ) {
        // console.log('location added');
        this.activeLocations.push(location);
        this.activeMarkers.push(
          L.marker([location.latitude, location.longitude], marker).bindPopup(
            popupText,
            {
              autoPan: false,
            }
          )
        );
      }
    });
    // console.log(this.activeLocations);

    // Without Cluster
    // this.activeMarkersLayerGroup = L.layerGroup(this.activeMarkers);
    // this.map.addLayer(this.activeMarkersLayerGroup);

    // With Cluster
    this.markerClusterData = this.activeMarkers;
  }

  reset() {
    this.clearForm();
    this.clearMarkers();
    this.refreshMap();
  }

  clearMarkers() {
    if (this.map.hasLayer(this.activeMarkersLayerGroup)) {
      this.map.removeLayer(this.activeMarkersLayerGroup);
    }
    if (this.map.hasLayer(this.selectedMarkerLayerGroup)) {
      this.map.removeLayer(this.selectedMarkerLayerGroup);
    }
  }

  clearForm() {
    this.locations = [];
    this.activeLocations = [];
    this.selectedMarker = null;
    this.selectedCity = [];
    this.selectedDepartments = [];
    this.selectedDistance = [];
    this.selectedSectors = [];
    this.selectedTypes = [];
  }

  onMouseEnterLocation(location: LocationForm) {
    // console.log(location);
    // if (this.map.hasLayer(this.activeMarkersLayerGroup))
    //   this.map.removeLayer(this.activeMarkersLayerGroup);
    this.markerClusterData = [];

    // const icon = getIcon(location);
    const popupText = popupHTML(location);
    let icon;
    if (location.type === TYPE_ENTREPRISE) {
      icon = this.entrepriseIcon;
    } else if (location.type === TYPE_LABORATOIRE) {
      icon = this.laboratoireIcon;
    } else if (location.type === TYPE_FORMATION) {
      icon = this.formationIcon;
    } else if (location.type === TYPE_ASSOCIATION_INSTITUTION) {
      icon = this.associationIcon;
    }

    this.selectedMarker = L.marker(
      [location.latitude, location.longitude],
      icon
    ).bindPopup(popupText);

    const markers = [];
    markers.push(this.selectedMarker);
    this.selectedMarkerLayerGroup = L.layerGroup(markers);

    this.map.addLayer(this.selectedMarkerLayerGroup);
    // this.selectedMarker = L.marker([50.5, 3]);
    // this.selectedMarker.addTo(this.map);
  }
  onMouseLeaveLocation(location: LocationForm) {
    // console.log(location);
    // this.selectedMarker.removeFrom(this.map);
    if (this.map.hasLayer(this.selectedMarkerLayerGroup))
      this.map.removeLayer(this.selectedMarkerLayerGroup);

    // if (!this.map.hasLayer(this.activeMarkersLayerGroup))
    //   this.map.addLayer(this.activeMarkersLayerGroup);

    this.markerClusterData = this.activeMarkers;
  }
}

// addMarkers() {
//   const markers = [];

//   this.locations.forEach((location) => {
//     let marker;
//     switch (location.type) {
//       case TYPE_ENTREPRISE:
//         marker = this.entrepriseIcon;
//         break;
//       case TYPE_FORMATION:
//         marker = this.formationIcon;
//         break;
//       case TYPE_LABORATOIRE:
//         marker = this.laboratoireIcon;
//         break;
//       case TYPE_ASSOCIATION_INSTITUTION:
//         marker = this.associationIcon;
//         break;

//       default:
//         marker = this.defaultIcon;
//         break;
//     }

//     const popupText = popupHTML(location);

//     markers.push(
//       L.marker([location.latitude, location.longitude], marker).bindPopup(
//         popupText
//       )
//     );
//   });

//   this.markersLayerGroup = L.layerGroup(markers);
//   this.map.addLayer(this.markersLayerGroup);
// }
