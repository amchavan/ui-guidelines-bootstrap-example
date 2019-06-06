import { Component, OnInit } from '@angular/core';
import { WsltSearchFormComponent } from "../wslt-search-form/wslt-search-form.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  isVisibleWarning = true;
  isVisibleInfo = true;

  constructor( private modalService: NgbModal ) { }

  ngOnInit() {
  }

  openWsltModalsearchForm() {
    this.modalService.open( WsltSearchFormComponent, { size: 'lg' } ).result.then(
        () => {
          // suceess -- no-op
        },
        () => {
          // failure -- no-op
        });
  }

}
