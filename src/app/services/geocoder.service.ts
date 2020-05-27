import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

const GEOCODER_API = `${environment.geocoderAPI}`;

@Injectable({
  providedIn: 'root',
})
export class GeocoderService {
  constructor(private http: HttpClient) {}

  geocode(query: string) {
    // Http Query Params
    let httpParams = new HttpParams();

    httpParams = httpParams.append('q', query);

    console.log(httpParams);

    return this.http.get<any>(`${GEOCODER_API}`, {
      params: httpParams,
    });
  }
}
