import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, latLng, marker, tileLayer, Map } from 'leaflet';
import { Observable, map } from 'rxjs';
import { Clinic } from 'src/app/models/clinics/clinic.model';
import { ClinicsActions, getClinicsWithoutImagesSelector,  } from 'src/app/modules/clinics/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
    clinics$!: Observable<Clinic[]>;

    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...', pane: 'overlayPane' }),
        ],
        zoom: 11,
        center: latLng(50.061853, 19.936989),
    };

    constructor(private store: Store<AppState>) {
        this.clinics$ = this.store.select(getClinicsWithoutImagesSelector);
    }

    ngOnInit(): void {
        this.store.dispatch(ClinicsActions.getClinicsWithoutImages());
    }

    ngAfterViewInit() {
        this.initializeMap();
      }
    
    initializeMap() {
        const myMap = new Map('map', this.options);
        this.clinics$.subscribe(clinics => {
          this.createMarkers(clinics).forEach(marker => marker.addTo(myMap));
        });
    }

    createMarkers(clinics: Clinic[]) {
        return clinics.map(clinic => 
            marker(
                [clinic.address.latitude, clinic.address.longitude],
                {
                    icon: icon({
                        iconSize: [41, 41],
                        iconUrl: '../../../../../assets/icons/map-marker.png',
                        shadowUrl: 'leaflet/marker-shadow.png'
                    })
                }
            ).bindPopup(
                `<p class="heading">${clinic.name}</p>
                <p class="address">${clinic.address.street} ${clinic.address.buildingNumber}</p>
                <p class="address">${clinic.address.postalCode} ${clinic.address.city}</p>`
            )
        );
    }
      
      
}
