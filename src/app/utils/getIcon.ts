import * as L from 'leaflet';
import { LocationForm } from '../models/Location';
import {
  TYPE_ENTREPRISE,
  TYPE_FORMATION,
  TYPE_LABORATOIRE,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../models/Location';

export const getIcon = (
  location: LocationForm,
  iconSize?: [number, number],
  iconAnchor?: [number, number],
  popupAnchor?: [number, number],
  iconUrl?: string,
  shadowUrl?: string
) => {
  if (location.type === TYPE_ENTREPRISE) {
    iconUrl = `assets/entreprise.svg`;
  } else if (location.type === TYPE_LABORATOIRE) {
    iconUrl = `assets/laboratoire.svg`;
  } else if (location.type === TYPE_FORMATION) {
    iconUrl = `assets/formation.svg`;
  } else if (location.type === TYPE_ASSOCIATION_INSTITUTION) {
    iconUrl = `assets/institution.svg`;
  }

  if (!iconSize) iconSize = [25, 41];
  if (!iconAnchor) iconAnchor = [10, 41];
  if (!popupAnchor) iconAnchor = [2, -40];

  if (!shadowUrl)
    shadowUrl = 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png';

  return {
    icon: L.icon({
      iconSize,
      iconAnchor,
      popupAnchor,
      iconUrl,
      shadowUrl,
    }),
  };
};

/*
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
*/
