import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  stationId = null;
  subscription: any;

  constructor( private actRoute: ActivatedRoute, private router: Router) { }

  onSubmit(form: NgForm): void{
    console.log(form);
  }

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id') !== '') {
          console.log(params.id);
          this.stationId = params.id;
        }
      });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
