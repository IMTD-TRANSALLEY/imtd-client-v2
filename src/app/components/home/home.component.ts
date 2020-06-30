import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { environment } from './../../../environments/environment';
import {
  TYPE_ENTREPRISE,
  TYPE_LABORATOIRE,
  TYPE_FORMATION,
  TYPE_ASSOCIATION_INSTITUTION,
} from '../../models/Location';

const FRONTEND_URL = `${environment.frontendURL}/locations`;

interface counter {
  type: string;
  value: number;
  max: number;
}

const EMPTY_COUNTER: counter = {
  type: '',
  value: 0,
  max: 0,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stats: [{ count: number; type: string }];

  counterEnt: counter = { ...EMPTY_COUNTER };
  counterLab: counter = { ...EMPTY_COUNTER };
  counterFor: counter = { ...EMPTY_COUNTER };
  counterAss: counter = { ...EMPTY_COUNTER };

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getStats().subscribe(
      (res) => {
        this.stats = res.data;
        console.log(this.stats);

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

        this.startCounters();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  startCounters() {
    this.startCounter(this.counterEnt);
    this.startCounter(this.counterLab);
    this.startCounter(this.counterFor);
    this.startCounter(this.counterAss);
  }

  startCounter(counter: counter) {
    let timeLeft = 5000; // secondes
    let interval = 50;

    if (counter.value < counter.max) {
      setInterval(() => {
        if (counter.value < counter.max) {
          counter.value++;
        }
      }, 50);
    }
    // setInterval(() => {
    //   if (counter.value < counter.max) {
    //     counter.value++;
    //   }
    // }, 50);
    // }
  }
}
