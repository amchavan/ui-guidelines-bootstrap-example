import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'wslt-search-form',
  templateUrl: './wslt-search-form.component.html',
  styleUrls: ['./wslt-search-form.component.css']
})
export class WsltSearchFormComponent implements OnInit {

  private QUERY_INTERVALS : any = [
    {value: 'LAST2', name: 'Last 2 hours'},
    {value: 'LAST4', name: 'Last 4 hours'},
    {value: 'LAST8', name: 'Last 8 hours'},
    {value: 'LASTD', name: 'Last day'},
    {value: 'LASTW', name: 'Last week'},
    {value: 'LASTM', name: 'Last month'},
    {value: 'LASTY', name: 'Last year'},
    {value: 'OTHER', name: 'Other'},
    {value: 'INDEF', name: 'Indefinite'},
  ];

  selectedInterval = null;

  // By default we don't show the interval start and end selectors
  intervalStart = null;
  intervalEnd = null;
  enableIntervalStart = false;
  enableIntervalEnd = false;
  isValidInterval = true;
  maxEntries = "";
  isValidMaxEntries = true;

  intervals = this.QUERY_INTERVALS;


  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() {
  }

  onSelectInterval(interval) {
    this.enableIntervalStart = false;
    this.enableIntervalEnd = false;
    this.selectedInterval = interval;

    if( this.selectedInterval.value == "OTHER") {
      this.enableIntervalStart = true;
      this.enableIntervalEnd = true;
    }
    else if( this.selectedInterval.value == "INDEF" ) {
      this.enableIntervalStart = false;
      this.enableIntervalEnd = true;
    }

    console.log( ">>> selected interval: " + interval.value );
  }


  // Max entries validator
  onMaxEntriesChange() {
    this.isValidMaxEntries = true;
    let emax = parseInt( this.maxEntries );
    if( isNaN(emax) || 1 > emax || emax > 1000 ) {
      this.isValidMaxEntries = false;
      console.log( ">>> max entries: INVALID" );
    }
    else {
      this.maxEntries = emax.toString();
      console.log( ">>> selected interval: " + this.maxEntries );
    }
  }
}
