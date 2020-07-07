import { LocationForm } from '../models/Location';
import {
  TYPE_ENTREPRISE,
  TYPE_FORMATION,
  TYPE_LABORATOIRE,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../models/Location';
import { environment } from './../../environments/environment';

const BACKEND_UPLOADS = `${environment.imtdUploads}`;
const FRONTEND_URL = `${environment.frontendURL}/locations`;

export const popupHTML = (location: LocationForm) => {
  let shortName = '';
  if (location.shortName !== '') {
    shortName = `${location.shortName} - `;
  }

  let keywords = '';
  if (location.keywords) {
    keywords = `<div class="card-text marker-popup-text">Mots clés : ${location.keywords}</div>`;
  }

  let formationTypes = '';
  if (location.formationTypes?.length > 0) {
    formationTypes = `
    <div class="card-text marker-popup-text" ;>
      <span class="font-weight-bold">Type de formation : </span>
      ${location.formationTypes.join(', ')}
    </div>`;
  }

  let formationLevels = '';
  if (location.formationLevels.length > 0) {
    formationLevels = `
    <div class="card-text marker-popup-text" ;>
      <span class="font-weight-bold ">Niveau de formation : </span>
      ${location.formationLevels.join(', ')}
    </div>`;
  }

  return `
      <div class="card marker-popup">
      <div class="row pt-1 px-2 mb-3">
          <img src="${BACKEND_UPLOADS}${location.logo}" class="img-fluid mx-auto d-block" style="max-height:5rem" alt="Logo" />
      </div>
      <h5 class="marker-popup-title mb-3">${shortName}${location.name}</h5>
      
      <h6 class="marker-popup-subtitle mb-3">${location.city} - ${location.postCode}</h6>
      <div>
        ${keywords}
        ${formationTypes}
        ${formationLevels}
      </div>
      <div class="row mt-3">
        <a href="${FRONTEND_URL}/${location._id}" class="popup-btn">Voir la fiche</a>
      </div>
    </div>
  `;
};

// let shortName = '';
//   if (location.shortName !== '') {
//     shortName = `${location.shortName} - `;
//   }

//   let keywords = '';
//   if (location.keywords) {
//     keywords = `<div class="card-text marker-popup-text">Mots clés : ${location.keywords}</div>`;
//   }

//   let formationTypes = '';
//   if (location.formationTypes?.length > 0) {
//     formationTypes = `
//     <div class="card-text marker-popup-text" ;>
//       <span class="font-weight-bold">Type de formation : </span>
//       ${location.formationTypes.join(', ')}
//     </div>`;
//   }

//   let formationLevels = '';
//   if (location.formationLevels.length > 0) {
//     formationLevels = `
//     <div class="card-text marker-popup-text" ;>
//       <span class="font-weight-bold ">Niveau de formation : </span>
//       ${location.formationLevels.join(', ')}
//     </div>`;
//   }

//   return `
//       <div class="card marker-popup">
//       <div class="row mb-3">
//         <div class="col-6">
//           <img src="assets/img.svg" class="img-fluid" alt="Logo" />
//         </div>
//         <div class="col-6">
//           <img src="assets/img.svg" class="img-fluid" alt="Responsive image" />
//         </div>
//       </div>
//       <h5 class="marker-popup-title mb-3">${shortName}${location.name}</h5>

//       <h6 class="marker-popup-subtitle mb-3">${location.city} - ${location.postCode}</h6>
//       <div>
//         ${keywords}
//         ${formationTypes}
//         ${formationLevels}
//       </div>
//       <div class="row mt-3">
//         <a href="${FRONTEND_URL}/${location._id}" class="popup-btn">Voir la fiche</a>
//       </div>
//     </div>
//   `;

// <div class="card-footer mt-3 text-right">
//   <a href="${FRONTEND_URL}/${location._id}" class="card-link">Voir la fiche</a>
// </div>

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
