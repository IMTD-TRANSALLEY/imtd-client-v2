export interface LocationForm {
  type: string;
  sectors: string[];
  name: string;
  shortName?: string;
  labCCode?: string;
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
}

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
