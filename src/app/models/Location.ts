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
