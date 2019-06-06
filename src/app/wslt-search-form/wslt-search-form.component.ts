import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wslt-search-form',
  templateUrl: './wslt-search-form.component.html',
  styleUrls: ['./wslt-search-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
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

  maxEntries = "";
  isValidMaxEntries = true;

  selectedInterval = null;

  // By default we don't show the interval start and end selectors
  intervalStart = null;
  intervalEnd = null;
  enableIntervalStart = false;
  enableIntervalEnd = false;
  isValidInterval = true; // TODO: form validation, see https://getbootstrap.com/docs/4.1/components/forms/#validation

  intervals = this.QUERY_INTERVALS;

  queryIntervalStartDate: Date;
  queryIntervalStartTime = null;
  queryIntervalStartSpinners = false;

  queryIntervalEndDate: Date;
  queryIntervalEndTime = null;
  queryIntervalEndSpinners = false;

  constructor( public activeModal: NgbActiveModal ) {
  }

  ngOnInit() {

    // Initialize query interval start and end datetimes
    //--------------------------------------------------
    const currentStartDate = new Date();
    const currentEndDate = new Date();

    currentStartDate.setUTCHours( 0, 0, 0, 0  );
    this.queryIntervalStartDate = currentStartDate;

    currentEndDate.setUTCHours( currentEndDate.getUTCHours(), currentEndDate.getMinutes(), 0, 0  );
    this.queryIntervalEndDate = currentEndDate;

    this.queryIntervalStartTime = { hour: currentStartDate.getUTCHours(), minute: currentStartDate.getMinutes() };
    this.queryIntervalEndTime   = { hour: currentEndDate.getUTCHours(),   minute: currentEndDate.getMinutes() }
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

  onStartTimeChange() {
    this.queryIntervalStartDate.setUTCHours( this.queryIntervalStartTime.hour, this.queryIntervalStartTime.minute );
    this.checkQueryInterval();
  }

  onStartDateChange() {
    this.checkQueryInterval();
  }

  onEndTimeChange() {
    this.queryIntervalEndDate.setUTCHours( this.queryIntervalEndTime.hour, this.queryIntervalEndTime.minute );
    this.checkQueryInterval();
  }

  onEndDateChange() {
    this.checkQueryInterval();
  }

  checkQueryInterval(){
    this.isValidInterval = this.queryIntervalEndDate.getTime() > this.queryIntervalStartDate.getTime();
    if( ! this.isValidInterval ) {
      // TODO: form validation, see https://getbootstrap.com/docs/4.1/components/forms/#validation
      console.log(">>> interval: INVALID");
    }
  }
}
