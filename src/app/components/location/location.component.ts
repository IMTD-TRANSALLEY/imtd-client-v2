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

  typeIconSrc = '';
  typeIconTitle = '';

  private locationId: string;

  private locationSubscription: Subscription;
  private paramMapSubscription: Subscription;

  readonly TYPE_ENTREPRISE: string = TYPE_ENTREPRISE;
  readonly TYPE_FORMATION: string = TYPE_FORMATION;
  readonly TYPE_LABORATOIRE: string = TYPE_LABORATOIRE;
  readonly TYPE_ASSOCIATION_INSTITUTION: string = TYPE_ASSOCIATION_INSTITUTION;

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

                if (this.location.type === TYPE_ENTREPRISE) {
                  this.typeIconSrc = `assets/entreprise_rounded_square.svg`;
                  this.typeIconTitle = TYPE_ENTREPRISE;
                } else if (this.location.type === TYPE_FORMATION) {
                  this.typeIconSrc = `assets/formation_rounded_square.svg`;
                  this.typeIconTitle = TYPE_FORMATION;
                } else if (this.location.type === TYPE_LABORATOIRE) {
                  this.typeIconSrc = `assets/laboratoire_rounded_square.svg`;
                  this.typeIconTitle = TYPE_LABORATOIRE;
                } else if (
                  this.location.type === TYPE_ASSOCIATION_INSTITUTION
                ) {
                  this.typeIconSrc = `assets/institution_rounded_square.svg`;
                  this.typeIconTitle = TYPE_ASSOCIATION_INSTITUTION;
                }
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
