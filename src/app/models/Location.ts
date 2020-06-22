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
  formationLevels?: string[];
  formationTypes?: string[];
  __v?: number;
  departmentCode?: number;
  departmentName?: string;
  position?: {
    coordinates: number[];
    type: string;
  };
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
  { typeId: 1, typeText: TYPE_ENTREPRISE },
  { typeId: 2, typeText: TYPE_LABORATOIRE },
  { typeId: 3, typeText: TYPE_FORMATION },
  { typeId: 4, typeText: TYPE_ASSOCIATION_INSTITUTION },
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
  { sectorId: 1, sectorText: SECTOR_AERONAUTIQUE },
  { sectorId: 2, sectorText: SECTOR_AUTOMOBILE },
  { sectorId: 3, sectorText: SECTOR_FERROVIAIRE },
  { sectorId: 4, sectorText: SECTOR_MOBILITE_DOUCE },
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
  { distanceId: 1, distanceValue: 10, distanceText: '10 km' },
  { distanceId: 2, distanceValue: 25, distanceText: '25 km' },
  { distanceId: 3, distanceValue: 50, distanceText: '50 km' },
  { distanceId: 4, distanceValue: 100, distanceText: '100 km' },
  { distanceId: 5, distanceValue: 200, distanceText: '200 km' },
];

/**
 * Cities - https://www.coordonnees-gps.fr/
 */
export const cities = [
  {
    cityId: 3,
    cityName: 'Amiens',
    cityLatitude: 49.9,
    cityLongitude: 2.3,
  },
  {
    cityId: 1,
    cityName: 'Valenciennes',
    cityLatitude: 50.357932,
    cityLongitude: 3.523485,
  },
  {
    cityId: 2,
    cityName: 'Lille',
    cityLatitude: 50.636565,
    cityLongitude: 3.063528,
  },
  {
    cityId: 4,
    cityName: 'Saint-Quentin',
    cityLatitude: 49.846525,
    cityLongitude: 3.287684,
  },
  {
    cityId: 5,
    cityName: 'Maubeuge',
    cityLatitude: 50.27964,
    cityLongitude: 3.967415,
  },
  {
    cityId: 6,
    cityName: 'Arras',
    cityLatitude: 50.291048,
    cityLongitude: 2.7772211,
  },
  {
    cityId: 7,
    cityName: 'Compiègne',
    cityLatitude: 49.4179497,
    cityLongitude: 2.8263171,
  },
  {
    cityId: 8,
    cityName: 'Calais',
    cityLatitude: 50.9488,
    cityLongitude: 1.87468,
  },
];

// FORMATION TYPES
export const FORMATION_TYPES_INITIALE = 'Initiale';
export const FORMATION_TYPES_CONTINUE = 'Continue';
export const FORMATION_TYPES_ALTERNANCE = 'Alternance';
export const FORMATION_TYPES_APPRENTISSAGE = 'Apprentissage';
export const FORMATION_TYPES_VAE = 'VAE';
export const FORMATION_TYPES_AUTRE = 'Autre';
export const FORMATION_TYPES_NON_DEFINI = 'Non Défini';
export const formationTypes = [
  FORMATION_TYPES_INITIALE,
  FORMATION_TYPES_CONTINUE,
  FORMATION_TYPES_ALTERNANCE,
  FORMATION_TYPES_APPRENTISSAGE,
  FORMATION_TYPES_VAE,
  FORMATION_TYPES_AUTRE,
  FORMATION_TYPES_NON_DEFINI,
];
export const formationTypesObjects = [
  { formationTypesId: 1, formationTypesText: FORMATION_TYPES_INITIALE },
  { formationTypesId: 2, formationTypesText: FORMATION_TYPES_CONTINUE },
  { formationTypesId: 3, formationTypesText: FORMATION_TYPES_ALTERNANCE },
  { formationTypesId: 4, formationTypesText: FORMATION_TYPES_APPRENTISSAGE },
  { formationTypesId: 5, formationTypesText: FORMATION_TYPES_VAE },
  { formationTypesId: 6, formationTypesText: FORMATION_TYPES_AUTRE },
  { formationTypesId: 7, formationTypesText: FORMATION_TYPES_NON_DEFINI },
];

// FORMATION LEVELS
export const FORMATION_LEVELS_CAP = 'CAP';
export const FORMATION_LEVELS_BTS = 'BTS';
export const FORMATION_LEVELS_BAC = 'Bac';
export const FORMATION_LEVELS_BAC_PRO = 'Bac Pro';
export const FORMATION_LEVELS_LICENCE = 'Licence';
export const FORMATION_LEVELS_MASTER = 'Master';
export const FORMATION_LEVELS_INGENIEUR = 'Ingénieur';
export const FORMATION_LEVELS_AUTRE = 'Autre';
export const FORMATION_LEVELS_NON_DEFINI = 'Non Défini';
export const formationLevels = [
  FORMATION_LEVELS_CAP,
  FORMATION_LEVELS_BTS,
  FORMATION_LEVELS_BAC,
  FORMATION_LEVELS_BAC_PRO,
  FORMATION_LEVELS_LICENCE,
  FORMATION_LEVELS_MASTER,
  FORMATION_LEVELS_INGENIEUR,
  FORMATION_LEVELS_AUTRE,
  FORMATION_LEVELS_NON_DEFINI,
];
export const formationLevelsObjects = [
  { formationLevelsId: 1, formationLevelsText: FORMATION_LEVELS_CAP },
  { formationLevelsId: 2, formationLevelsText: FORMATION_LEVELS_BTS },
  { formationLevelsId: 3, formationLevelsText: FORMATION_LEVELS_BAC },
  { formationLevelsId: 4, formationLevelsText: FORMATION_LEVELS_BAC_PRO },
  { formationLevelsId: 5, formationLevelsText: FORMATION_LEVELS_LICENCE },
  { formationLevelsId: 6, formationLevelsText: FORMATION_LEVELS_MASTER },
  { formationLevelsId: 7, formationLevelsText: FORMATION_LEVELS_INGENIEUR },
  { formationLevelsId: 8, formationLevelsText: FORMATION_LEVELS_AUTRE },
  { formationLevelsId: 9, formationLevelsText: FORMATION_LEVELS_NON_DEFINI },
];
