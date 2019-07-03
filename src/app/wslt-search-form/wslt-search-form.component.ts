import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'wslt-search-form',
    templateUrl: './wslt-search-form.component.html',
    styleUrls: ['./wslt-search-form.component.css'],
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class WsltSearchFormComponent implements OnInit {

    /* Entry types */
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
    selectedEntryTypes: boolean[];

    /* Keywords */
    iAntInt     = 0;
    iFeatures   = 1;
    iHandover   = 2;
    iHwTesting  = 3;
    iRegression = 4;
    iSciVer     = 5;
    iSystEng    = 6;
    iSwTesting  = 7;
    allEntryTypesSelected: boolean;

    /* EngineeringGroups */
    iAntCont  = 0;
    iBackend  = 1;
    iCorr     = 2;
    iFrontEnd = 3;
    iSoftware = 4;

    selectedEntryKeywords: boolean[];
    allEntryKeywordsSelected: boolean;

    selectedEngGroups: boolean[];
    allEngGroupsSelected: boolean;

    private QUERY_INTERVALS: any = [
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

    private AFFECTED_FAMILIES: any = [
        {value: '12m', name: '12 [m]'},
        {value: '7m', name: '7 [m]'},
        {value: 'TP', name: 'Total Power'},
        {value: 'MIX', name: 'Mixed'},
    ];

    private SHIFT_ACTIVITIES: any = [
        'EOC',
        'Engineering',
        'SciOps',
        'AIV',
        'CSV',
        'Operations',
        'SYST'
    ];

    private DOWNTIME_TYPE: any = [
        'Technical',
        'Weather',
        'Scheduling'
    ];

    // By default we don't show the interval start and end selectors
    enableIntervalStart = false;
    enableIntervalEnd = false;
    isValidInterval = true; // TODO: form validation, see https://getbootstrap.com/docs/4.1/components/forms/#validation

    intervals = this.QUERY_INTERVALS;
    selectedInterval = null;

    shiftActivities = this.SHIFT_ACTIVITIES;
    selectedShiftActivity = null;

    affectedFamilies = this.AFFECTED_FAMILIES;
    selectedAffectedFamily = null;

    downtimeTypes = this.DOWNTIME_TYPE;
    selectedDowntimeType = null;

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

    wsltQueryParamForm: FormGroup;
    submitted = false;

    constructor( fb: FormBuilder, public activeModal: NgbActiveModal ) {

        // We only validate the maxEntries field here
        this.wsltQueryParamForm = fb.group({
            maxEntries:  ['100', [Validators.required, Validators.min(1 ), Validators.max( 1000 )]]
        });
    }

    /*
     * Prevent a panel from being closed, resulting in all panels being
     * closed at the same time -- one of the panels should always be open
     */
    public preventPanelClosing( $event: NgbPanelChangeEvent ) {
        /*
         * $event.nextState         true  ==> panel is toggling to an open state
         *                          false ==> panel is toggling to a closed state
         * $event.panelId           ID of the panel that was clicked
         * $event.preventDefault()  Don't toggle the state of the selected panel
         */
        console.log( $event );

        if ( $event.nextState === false ) {     // are we trying to close some panel?
            $event.preventDefault();            // YES, prevent that
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.wsltQueryParamForm.controls;
    }

    ngOnInit() {

        // Initialize query interval start and end datetimes
        // --------------------------------------------------
        const currentStartDate = new Date();
        const currentEndDate = new Date();

        currentStartDate.setUTCHours( 0, 0, 0, 0  );
        this.queryIntervalStartDate = currentStartDate;

        currentEndDate.setUTCHours( currentEndDate.getUTCHours(), currentEndDate.getMinutes(), 0, 0  );
        this.queryIntervalEndDate = currentEndDate;

        this.queryIntervalStartTime = { hour: currentStartDate.getUTCHours(), minute: currentStartDate.getMinutes() };
        this.queryIntervalEndTime   = { hour: currentEndDate.getUTCHours(),   minute: currentEndDate.getMinutes() };

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

        // Init groups selection
        // --------------------------------------
        this.allEngGroupsSelected = false;
        this.selectedEngGroups = [];
        this.selectDeselectAllEngGroups( this.allEngGroupsSelected );
    }

    private selectDeselectAllEntryTypes( select: boolean ) {
        for (let i = 0; i < 11; i++) {
            this.selectedEntryTypes[i] = select;
        }
    }

    private selectDeselectAllEntryKeywords( select: boolean ) {
        for (let i = 0; i < 11; i++) {
            this.selectedEntryKeywords[i] = select;
        }
    }

    private selectDeselectAllEngGroups( select: boolean ) {
        for (let i = 0; i < 11; i++) {
            this.selectedEngGroups[i] = select;
        }
    }

    onSelectAllEntryTypesChange( select ) {
        this.selectDeselectAllEntryTypes( select );
    }

    onSelectAllEntryKeywordsChange( select ) {
        this.selectDeselectAllEntryKeywords( select );
    }

    onSelectAllEngGroupsChange( select ) {
        this.selectDeselectAllEngGroups( select );
    }

    onSelectInterval( interval ) {
        this.enableIntervalStart = false;
        this.enableIntervalEnd = false;
        this.selectedInterval = interval;

        if ( this.selectedInterval.value === 'OTHER') {
            this.enableIntervalStart = true;
            this.enableIntervalEnd = true;
        } else if ( this.selectedInterval.value === 'INDEF' ) {
            this.enableIntervalStart = false;
            this.enableIntervalEnd = true;
        }

        console.log( '>>> selected interval: ' + interval.value );
    }


    onSelectShiftActivity( activity ) {
        this.selectedShiftActivity = activity;
        console.log( '>>> selected activity: ' + activity );
    }


    onSelectDowntimeType( type ) {
        this.selectedDowntimeType = type;
        console.log( '>>> selected downtime type: ' + type );
    }


    onSelectAffectedFamily( family ) {
        this.selectedAffectedFamily = family;
        console.log( '>>> selected family: ' + family );
    }

    // Max entries validator
    onMaxEntriesChange() {
        this.submitted = true;
        // this.isValidMaxEntries = true;
        // const emax = parseInt( this.maxEntries, 10 );
        // if ( isNaN(emax) || 1 > emax || emax > 1000 ) {
        //   this.isValidMaxEntries = false;
        //   console.log( '>>> max entries: INVALID' );
        // } else {
        //   this.maxEntries = emax.toString();
        //   console.log( '>>> selected interval: ' + this.maxEntries );
        // }
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

    checkQueryInterval() {
        this.isValidInterval = this.queryIntervalEndDate.getTime() > this.queryIntervalStartDate.getTime();
        if ( ! this.isValidInterval ) {
            // TODO: form validation, see https://getbootstrap.com/docs/4.1/components/forms/#validation
            console.log('>>> interval: INVALID');
        }
    }

    onEntriesTypeChange(index) {
        console.log('>>> type ' + index + ': ' + this.selectedEntryTypes[index]);
    }
}
