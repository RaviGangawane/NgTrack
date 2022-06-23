import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../environments/environment';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DataService } from './data.service';
export interface Note {
  id?: string;
  timestamp: string;
  accuracy: string;
  altitude: string;
  altitudeAccuracy: string;
  heading: string;
  latitude: string;
  longitude: string;
  speed: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngTrack';
  map: any;

  notes: Note[] = [];
  lastLocation: any;
  secondLastLocation: any;
  constructor(
    private firestore: Firestore,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
      this.lastLocation = this.notes[this.notes.length - 1];
      this.cd.detectChanges();
    });
  }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private getCurrentPosition(): any {
    console.log('ttttttttttt');
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          this.lastLocation = this.notes[this.notes.length - 1];

          if (
            this.lastLocation &&
            this.lastLocation.latitude !== position.coords.latitude &&
            this.lastLocation.longitude !== position.coords.longitude
          ) {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
            this.dataService.addNote({
              timestamp: position.timestamp,
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
            });
          }

          observer.complete();
          this.dataService.getNotes().subscribe((res) => {
            this.notes = res;
            this.cd.detectChanges();
          });
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution: 'test',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }
    ).addTo(this.map);

    setTimeout(() => {
      var route = L.featureGroup();

      const icon = L.icon({
        iconUrl:
          'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-icon.png',
        shadowUrl:
          'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
        popupAnchor: [13, 0],
      });
      for (var i = 0; i < this.notes.length - 1; i++) {
        var marker = L.marker(
          [
            Number(this.notes[i]['latitude']),
            Number(this.notes[i]['longitude']),
          ],
          { icon }
        );

        var line = L.polyline([
          [
            Number(this.notes[i]['latitude']),
            Number(this.notes[i]['longitude']),
          ],
          [
            Number(this.notes[i + 1]['latitude']),
            Number(this.notes[i + 1]['longitude']),
          ],
        ]);

        route.addLayer(marker);
        route.addLayer(line);
      }
      // route.addLayer(new L.Marker(markers[n - 1]));
      this.map.fitBounds(route.getBounds());
      this.map.addLayer(route);

      route.on('snakestart snake snakeend', function (ev) {
        console.log('ev', ev);
        console.log(ev.type);
      });
    }, 3000);

    this.lastLocation = this.notes[this.notes.length - 1];
    this.secondLastLocation = this.notes[this.notes.length - 2];
    console.log(' this.secondLastLocation',  this.secondLastLocation)

    if (
      this.lastLocation &&
      this.lastLocation.latitude !== this.secondLastLocation.latitude &&
      this.lastLocation.longitude !== this.secondLastLocation.longitude
    ) {
      setInterval(() => {
        this.getCurrentPosition().subscribe((position: any) => {
          const icon = L.icon({
            iconUrl:
              'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-icon.png',
            shadowUrl:
              'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
            popupAnchor: [13, 0],
          });

          this.map.flyTo([position.latitude, position.longitude], 9);
          const marker = L.marker([position.latitude, position.longitude], {
            icon,
          }).bindPopup('Angular Leaflet');
          marker.addTo(this.map);
        });
      }, 3000);
    }
  }
}
