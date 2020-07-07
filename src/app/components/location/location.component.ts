import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  TYPE_ENTREPRISE,
  TYPE_FORMATION,
  TYPE_LABORATOIRE,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../../models/Location';

import { environment } from './../../../environments/environment';

const BACKEND_UPLOADS = `${environment.imtdUploads}`;
// const FRONTEND_URL = `${environment.frontendURL}/locations`;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, OnDestroy {
  isLoading = false;
  location = null;
  logoUrl = '';

  private locationId: string;

  private locationSubscription: Subscription;
  private paramMapSubscription: Subscription;

  readonly TYPE_FORMATION = TYPE_FORMATION;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        // Check if route has id param
        if (paramMap.has('id')) {
          this.isLoading = true;
          this.locationId = paramMap.get('id');
          this.locationSubscription = this.locationService
            .getLocation(this.locationId)
            .subscribe(
              (res) => {
                console.log(res);
                this.isLoading = false;
                this.location = res.data;
                this.logoUrl = `${BACKEND_UPLOADS}${this.location.logo}`;
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
  }
}
// this.locationSubscription = this.locationService
//   .getLocation()
//   .subscribe()
//   .getAuthStatusListener()
//   .subscribe((authStatus) => {
//     this.isLoading = false;
//   });
// }
