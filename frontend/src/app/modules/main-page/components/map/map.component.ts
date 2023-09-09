import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...', pane: 'overlayPane' }),
        ],
        zoom: 11,
        center: latLng(50.061853, 19.936989),
    };
}
