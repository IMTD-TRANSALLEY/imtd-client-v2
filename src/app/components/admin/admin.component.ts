import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  locations = [];
  keyword = '';
  private locationSub: Subscription;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.getLocations({});
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }

  onInputKeyword() {
    console.log(this.keyword);
    this.getLocations(this.keyword === '' ? {} : { keyword: this.keyword });
  }

  getLocations(params) {
    // console.log(params);
    this.locationSub = this.locationService.getLocations(params).subscribe(
      (response) => {
        console.log(response);
        // console.log(this.locations);
        this.locations = response.data;
      },
      (error) => {
        console.log(error);
        this.locations = [];
      }
    );
  }

  // METHOD REPLACED BY <a> tag
  // onDisplayLocation(id: string) {
  //   console.log(`Afficher la localisation ${id}`);
  // }

  onEditLocation(id: string) {
    console.log(`Editer la localisation ${id}`);
  }

  onDeleteLocation(location: any) {
    if (window.confirm(`Supprimer la localisation ${location.name} ?`)) {
      console.log(location);
      this.locationService.deleteLocation(location._id).subscribe(
        (res) => {
          console.log(`Localisation ${location.name} supprimée`);
          this.locations = this.locations.filter(
            (el) => el.name !== location.name
          );
          window.alert(`Localisation ${location.name} supprimée`);
        },
        (err) => {
          console.log(err);
          window.alert(err.error.message);
        }
      );
    }
  }
}
