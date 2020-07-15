import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { LocationForm } from '../models/Location';

const BACKEND_URL = `${environment.imtdAPI}/locations`;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  //
  private lastLocations: LocationForm[];

  constructor(private http: HttpClient) {
    this.lastLocations = [];
  }

  getLastLocations(): LocationForm[] {
    return this.lastLocations;
  }

  setLastLocations(locations: LocationForm[]) {
    this.lastLocations = locations;
  }

  hasLastLocations(): boolean {
    return this.lastLocations.length > 0;
  }

  getLocations(params: any) {
    // Http Query Params
    let httpParams = new HttpParams();

    for (let key in params) {
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

  getStats() {
    return this.http.get<any>(`${BACKEND_URL}/stats`);
  }

  createLocation(location: LocationForm) {
    return this.http.post<any>(`${BACKEND_URL}`, location);
  }

  updateLocation(location: LocationForm) {
    return this.http.put<any>(`${BACKEND_URL}/${location._id}`, location);
  }

  updateLocationLogo(id: string, formData: FormData) {
    return this.http.put<any>(`${BACKEND_URL}/${id}/logo`, formData);
  }

  deleteLocation(id: string) {
    return this.http.delete<any>(`${BACKEND_URL}/${id}`);
  }
}
