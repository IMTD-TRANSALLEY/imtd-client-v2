export interface LocationForm {
  _id?: string;
  type: string;
  sectors: string[];
  name: string;
  shortName?: string;
  labCode?: string;
  street: string;
  location?: string;
  postCode: string;
  city: string;
  phone?: string;
  website?: string;
  numbers?: string;
  description: string;
  keywords?: string;
  logo: string;
  latitude: number;
  longitude: number;
  formationLevel?: string[];
  formationType?: string[];
  __v?: number;
  departmentCode?: number;
  departmentName?: string;
}

export const EMPTY_LOCATION: LocationForm = {
  type: '',
  sectors: [],
  name: '',
  street: '',
  postCode: '',
  city: '',
  description: '',
  logo: '',
  latitude: 0,
  longitude: 0,
};

/**
 * TYPES
 */
export const TYPE_ENTREPRISE = 'Entreprise';
export const TYPE_LABORATOIRE = 'Laboratoire';
export const TYPE_FORMATION = 'Formation';
export const TYPE_ASSOCIATION_INSTITUTION = 'Association et Institution';

export const types = [
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
];

export const typesWithID = [
  { type_id: 1, type_text: TYPE_ENTREPRISE },
  { type_id: 2, type_text: TYPE_LABORATOIRE },
  { type_id: 3, type_text: TYPE_FORMATION },
  { type_id: 4, type_text: TYPE_ASSOCIATION_INSTITUTION },
];

/**
 * SECTORS
 */

export const SECTOR_AERONAUTIQUE = 'Aéronautique';
export const SECTOR_AUTOMOBILE = 'Automobile';
export const SECTOR_FERROVIAIRE = 'Ferroviaire';
export const SECTOR_MOBILITE_DOUCE = 'Mobilité Douce';

export const sectors = [
  SECTOR_AERONAUTIQUE,
  SECTOR_AUTOMOBILE,
  SECTOR_FERROVIAIRE,
  SECTOR_MOBILITE_DOUCE,
];

export const sectorsWithID = [
  { sector_id: 1, sector_text: SECTOR_AERONAUTIQUE },
  { sector_id: 2, sector_text: SECTOR_AUTOMOBILE },
  { sector_id: 3, sector_text: SECTOR_FERROVIAIRE },
  { sector_id: 4, sector_text: SECTOR_MOBILITE_DOUCE },
];

/**
 * Departments
 */
export const departments = [
  { departmentName: 'Aisne', departmentCode: '02' },
  { departmentName: 'Nord', departmentCode: '59' },
  { departmentName: 'Oise', departmentCode: '60' },
  { departmentName: 'Pas-de-Calais', departmentCode: '62' },
  { departmentName: 'Somme', departmentCode: '80' },
];

/**
 * Distances
 */
export const distances = [
  { distanceID: 1, distanceValue: 10, distanceText: '10 km' },
  { distanceID: 2, distanceValue: 25, distanceText: '25 km' },
  { distanceID: 3, distanceValue: 50, distanceText: '50 km' },
  { distanceID: 4, distanceValue: 100, distanceText: '100 km' },
  { distanceID: 5, distanceValue: 200, distanceText: '200 km' },
];

/**
 * Cities
 */
export const cities = [
  {
    cityID: 1,
    cityName: 'Valenciennes',
    cityLatitude: 50.358173,
    cityLongitude: 3.509748,
  },
  {
    cityID: 2,
    cityName: 'Lille',
    cityLatitude: 50.630206,
    cityLongitude: 3.04584,
  },
];
