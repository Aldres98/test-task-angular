import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import stations from '../../assets/charging_station_msk.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  features = stations.features;

  showRequestForm(id): void {
    this.router.navigate(['./', { outlets: { modal: ['request-form', id]} }]);
    console.log(id);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {

    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: environment.mapbox.defaultStyle,
      zoom: 8,
      center: [37.7068761, 55.5821559]
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('load', () => {
      this.map.addSource('stations', {
        type: 'geojson',
        data: stations
      });
      this.map.addLayer({
        id: 'stationsLayer',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': 5,
          'circle-color': '#0000ff'
        }
      });
    });

    this.map.on('mouseenter', 'stationsLayer', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
      const coordinates = e.features[0].geometry.coordinates.slice();
      const id = e.features[0].properties['@id'];
      const operator = e.features[0].properties.operator;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      popup.setLngLat(coordinates).setHTML(`<p>id: ${id}</p> <p>operator: ${operator}</p>`).addTo(this.map);
    });

    this.map.on('mouseleave', 'stationsLayer', () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    });

    this.map.on('click', 'stationsLayer', (e) => {
      this.showRequestForm(e.features[0].properties['@id']);
    });



  }

}
