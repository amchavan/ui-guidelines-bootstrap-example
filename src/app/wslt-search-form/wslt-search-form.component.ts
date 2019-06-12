import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wslt-search-form',
  templateUrl: './wslt-search-form.component.html',
  styleUrls: ['./wslt-search-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class WsltSearchFormComponent implements OnInit {


  iAnten = 0;
  iAog   = 1;
  iArray = 2;
  iCmdln = 3;
  iDown  = 4;
  iEngin = 5;
  iEntry = 6;
  iMmex  = 7;
  iSbex  = 8;
  iShift = 9;
  iWeath = 10;
  selectedEntryTypes : boolean[];


  iAntInt     = 0;
  iFeatures   = 1;
  iHandover   = 2;
  iHwTesting  = 3;
  iRegression = 4;
  iSciVer     = 5;
  iSystEng    = 6;
  iSwTesting  = 7;
  allEntryTypesSelected : boolean;


  selectedEntryKeywords : boolean[];
  allEntryKeywordsSelected : boolean;

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

  private SHIFT_ACTIVITIES : any = [
      "EOC",
      "Engineering",
      "SciOps",
      "AIV",
      "CSV",
      "Operations",
      "SYST"
  ];

  maxEntries = "";
  isValidMaxEntries = true;


  // By default we don't show the interval start and end selectors
  intervalStart = null;
  intervalEnd = null;
  enableIntervalStart = false;
  enableIntervalEnd = false;
  isValidInterval = true; // TODO: form validation, see https://getbootstrap.com/docs/4.1/components/forms/#validation

  intervals = this.QUERY_INTERVALS;
  selectedInterval = null;

  shiftActivities = this.SHIFT_ACTIVITIES;
  selectedShiftActivity= null;

  queryIntervalStartDate: Date;
  queryIntervalStartTime = null;
  queryIntervalStartSpinners = false;

  queryIntervalEndDate: Date;
  queryIntervalEndTime = null;
  queryIntervalEndSpinners = false;

  entryAuthor = null;
  entrySubject = null;
  entryLocation = null;
  entryComment = null;

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

    // Init entry type selection
    // --------------------------------------
    this.allEntryTypesSelected = false;
    this.selectedEntryTypes = [];
    this.selectDeselectAllEntryTypes( this.allEntryTypesSelected );

    // Init keyword selection
    // --------------------------------------
    this.allEntryKeywordsSelected = false;
    this.selectedEntryKeywords = [];
    this.selectDeselectAllEntryKeywords( this.allEntryKeywordsSelected );
  }

  private selectDeselectAllEntryTypes( select : boolean ) {
    for (let i = 0; i < 11; i++) {
      this.selectedEntryTypes[i] = select;
    }
  }

  private selectDeselectAllEntryKeywords( select : boolean ) {
    for (let i = 0; i < 11; i++) {
      this.selectedEntryKeywords[i] = select;
    }
  }

  onSelectAllEntryTypesChange( select ) {
    this.selectDeselectAllEntryTypes( select );
  }

  onSelectAllEntryKeywordsChange( select ) {
    this.selectDeselectAllEntryKeywords( select );
  }

  onSelectInterval( interval ) {
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


  onSelectShiftActivity( activity ) {
    this.selectedShiftActivity = activity;
    console.log( ">>> selected interval: " + activity );
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

  onEntriesTypeChange(index) {
    console.log(">>> type " + index + ": " + this.selectedEntryTypes[index])
  }

  onEntriesKeywordChange(index) {
    console.log(">>> keyword " + index + ": " + this.selectedEntryKeywords[index])
  }
}
