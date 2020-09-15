import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import stations from '../../assets/charging_station_msk.json';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  requestTypes = [
    {id: 1, name: 'Изменить информацию'},
    {id: 2, name: 'Изменить сокет'},
    {id: 3, name: 'Удалить объект'}
  ];

  stationId = null;
  currentStation = null;
  currentRequestType = 1;
  subscription: any;

  constructor( private actRoute: ActivatedRoute, private router: Router) { }

  onSubmit(form: NgForm): void{
    console.log(form.value);
  }

  assignRequestType(requestType): void {
    this.currentRequestType = requestType;
    console.log(requestType);
  }

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id') !== '') {
          console.log(params.id);
          this.stationId = params.id;
          this.currentStation = stations.features.find(el => el.properties['@id'] === this.stationId).properties;
          console.log(this.currentStation);
        }
      });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
