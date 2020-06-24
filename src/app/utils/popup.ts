import { LocationForm } from '../models/Location';
import { environment } from './../../environments/environment';
import {
  TYPE_ENTREPRISE,
  TYPE_FORMATION,
  TYPE_LABORATOIRE,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../models/Location';

const FRONTEND_URL = `${environment.frontendURL}/locations`;

export const popupHTML = (location: LocationForm) => {
  let shortName = '';
  if (location.shortName !== '') {
    shortName = `${location.shortName} - `;
  }

  let keywords = '';
  if (location.keywords) {
    keywords = `<div class="card-text">Mots clés : ${location.keywords}</div>`;
  }

  let formationTypes = '';
  if (location.formationTypes?.length > 0) {
    formationTypes = `
    <div class="card-text">
      <span class="font-weight-bold">Type de formation : </span>
      ${location.formationTypes.join(', ')}
    </div>`;
  }

  let formationLevels = '';
  if (location.formationLevels.length > 0) {
    formationLevels = `
    <div class="card-text">
      <span class="font-weight-bold">Niveau de formation : </span>
      ${location.formationLevels.join(', ')}
    </div>`;
  }

  return `
    <div class="card" style="width: 18rem; border: none;">
    <div class="row mb-3">
      <div class="col-6">
        <img src="assets/img.svg" class="img-fluid" alt="Responsive image" />
      </div>
      <div class="col-6">
        <img src="assets/img.svg" class="img-fluid" alt="Responsive image" />
      </div>
    </div>
    <h5 class="card-title mb-3 text-imtd1">${shortName}${location.name}</h5>
    
    <h6 class="card-subtitle mb-3 text-muted">${location.city} - ${location.postCode}</h6>
    ${keywords}
    ${formationTypes}
    ${formationLevels}
    <div class="card-footer mt-3 text-right">
      <a href="${FRONTEND_URL}/${location._id}" class="card-link">Voir la fiche</a>
    </div>
  </div>
  `;
  // <h5 class="card-title mb-3" style="color: #007e42;">${shortName}${location.name}</h5>

  // return `
  // <div class="card border-light" style="width: 15rem;">
  //   <!-- <img class="card-img-left" src="assets/img.svg" alt="Card image cap" /> -->
  //   <div class="card-header">
  //     <div class="row">
  //       <div class="col-6">Test</div>
  //       <div class="col-6">Test 2</div>
  //     </div>
  //   </div>
  //   <div class="card-body">
  //     <p class="card-text">
  //       Some quick example text to build on the card title and make up the bulk of
  //       the card's content.
  //     </p>
  //   </div>
  // </div>
  // `;
  // return `
  // ${location.name} <a href="${FRONTEND_URL}/${location._id}">Voir</a>
  // `;
};
