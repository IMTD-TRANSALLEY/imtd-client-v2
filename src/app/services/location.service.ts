import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { LocationForm } from '../models/Location';

const BACKEND_URL = `${environment.apiURL}/locations`;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // private locationRequestListener = new Subject<any>();

  constructor(private http: HttpClient) {}

  // getLocations(params: any) {
  //   return this.http
  //     .get<any>(`${BACKEND_URL}`, {
  //       params: new HttpParams(params),
  //     })
  //     .subscribe(
  //       (res) => {
  //         return res;
  //       },
  //       (err) => {
  //         return err;
  //       }
  //     );
  // }
  getLocations(params: any) {
    // Http Query Params
    let httpParams = new HttpParams();

    for (var key in params) {
      httpParams = httpParams.append(key, params[key]);
    }
    console.log(httpParams);

    return this.http.get<any>(`${BACKEND_URL}`, {
      params: httpParams,
    });
  }

  getLocation(id: string) {
    return this.http.get<any>(`${BACKEND_URL}/${id}`);
  }

  createLocation(location: LocationForm) {
    return this.http.post<any>(`${BACKEND_URL}`, location);
  }

  updateLocationLogo(id: string, formData: FormData) {
    return this.http.put<any>(`${BACKEND_URL}/${id}/logo`, formData);
  }

  deleteLocation(id: string) {
    return this.http.delete<any>(`${BACKEND_URL}/${id}`);
  }

  // isEmpty(obj) {
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key)) return false;
  //   }
  //   return true;
  // }
}
