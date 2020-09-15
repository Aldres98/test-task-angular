import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  onCloseUrl = '/';
  stationId = null;

  constructor(private router: Router) { }

  closeModal( $event ) {
    this.router.navigateByUrl(this.onCloseUrl);
    this.modalClose.next($event);

  }


  ngOnInit(): void {
  }

}
