import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { environment } from './../../../environments/environment';
import {
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../../models/Location';
import { Counter, EMPTY_COUNTER } from '../../models/counter';
const FRONTEND_URL = `${environment.frontendURL}/locations`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Array of objects that contain the name and amount of each location type
  stats: [{ count: number; type: string }];

  counterEnt: Counter = { ...EMPTY_COUNTER }; // counter for TYPE_ENTREPRISE
  counterLab: Counter = { ...EMPTY_COUNTER }; // counter for TYPE_LABORATOIRE
  counterFor: Counter = { ...EMPTY_COUNTER }; // counter for TYPE_FORMATION
  counterAss: Counter = { ...EMPTY_COUNTER }; // counter for TYPE_ASSOCIATION_INSTITUTION

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    // Get locations stats
    this.locationService.getStats().subscribe(
      (res) => {
        this.stats = res.data;
        // console.log(this.stats);

        // for each type of location, create its counter
        for (let stat of this.stats) {
          if (stat.type === TYPE_ENTREPRISE) {
            this.counterEnt = { type: stat.type, value: 0, max: stat.count };
          } else if (stat.type === TYPE_LABORATOIRE) {
            this.counterLab = { type: stat.type, value: 0, max: stat.count };
          } else if (stat.type === TYPE_FORMATION) {
            this.counterFor = { type: stat.type, value: 0, max: stat.count };
          } else if (stat.type === TYPE_ASSOCIATION_INSTITUTION) {
            this.counterAss = { type: stat.type, value: 0, max: stat.count };
          }
        }

        // start all counters
        this.startCounters();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Start counter for each type of location
  startCounters() {
    this.startCounter(this.counterEnt);
    this.startCounter(this.counterLab);
    this.startCounter(this.counterFor);
    this.startCounter(this.counterAss);
  }

  /**
   *
   * @param counter Counter of a location
   */
  startCounter(counter: Counter) {
    const timeLeft = 1000; // ms
    const interval = (timeLeft / counter.max) * 0.95;

    const id = setInterval(() => {
      if (counter.value < counter.max * 0.95) {
        counter.value++;
      } else {
        const interval2 = timeLeft / (counter.max - counter.value);

        const id2 = setInterval(() => {
          if (counter.value < counter.max) {
            counter.value++;
          } else {
            clearInterval(id2);
          }
        }, interval2);
        clearInterval(id);
      }
    }, interval);
  }
}
