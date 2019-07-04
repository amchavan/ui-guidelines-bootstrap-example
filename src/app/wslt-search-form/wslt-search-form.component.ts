import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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

    intervals = this.QUERY_INTERVALS;
    selectedInterval = null;

    shiftActivities = this.SHIFT_ACTIVITIES;
    selectedShiftActivity = null;

    affectedFamilies = this.AFFECTED_FAMILIES;
    selectedAffectedFamily = null;

    downtimeTypes = this.DOWNTIME_TYPE;
    selectedDowntimeType = null;

    queryIntervalStartSpinners = false;
    queryIntervalEndSpinners = false;

    entryAuthor = null;
    entrySubject = null;
    entryLocation = null;
    entryComment = null;

    wsltQueryParamForm: FormGroup;
    fb: FormBuilder;

    constructor( fb: FormBuilder, public activeModal: NgbActiveModal ) {
        this.fb = fb;
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

        // clear hour, min, sec, msec
        currentStartDate.setUTCHours( 0, 0, 0, 0  );

        // clear sec, msec
        currentEndDate.setUTCHours( currentEndDate.getUTCHours(), currentEndDate.getMinutes(), 0, 0  );

        const currentStartTime = {
            hour: currentStartDate.getUTCHours(),
            minute: currentStartDate.getMinutes()
        };

        const currentEndTime = {
            hour: currentEndDate.getUTCHours(),
            minute: currentEndDate.getMinutes()
        };

        this.wsltQueryParamForm = this.fb.group({
            maxEntries:             ['100',            [Validators.required,
                                                        Validators.min( 1 ),
                                                        Validators.max( 1000 )]],
            queryIntervalStartDate: [currentStartDate, []],
            queryIntervalStartTime: [currentStartTime, []],
            queryIntervalEndDate:   [currentEndDate,   []],
            queryIntervalEndTime:   [currentEndTime,   []]
            },
            {
                validator: checkIfEndDateAfterStartDate
            }
        );

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

    /*
     * Prevent a panel from being closed, resulting in all panels being
     * closed at the same time -- exactly one of the panels should  be
     * open at all times
     */
    public preventPanelClosing( $event: NgbPanelChangeEvent ) {
        /*
         * $event.nextState         true  ==> panel opening
         *                          false ==> panel closing
         * $event.panelId           ID of the panel
         * $event.preventDefault()  Don't toggle the state of selected panel
         */
        console.log( $event );

        if ( $event.nextState === false ) {     // trying to close some panel?
            $event.preventDefault();            // YES, prevent that
        }
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
    }

    onStartTimeChange() {
        this.wsltQueryParamForm.value.queryIntervalStartDate.setUTCHours(
            this.wsltQueryParamForm.value.queryIntervalStartTime.hour,
            this.wsltQueryParamForm.value.queryIntervalStartTime.minute );
    }

    onEndTimeChange() {
        this.wsltQueryParamForm.value.queryIntervalEndDate.setUTCHours(
            this.wsltQueryParamForm.value.queryIntervalEndTime.hour,
            this.wsltQueryParamForm.value.queryIntervalEndTime.minute );
    }

    onEntriesTypeChange(index) {
        console.log('>>> type ' + index + ': ' + this.selectedEntryTypes[index]);
    }

    getQueryIntervalStartISO() {
        return this.wsltQueryParamForm.value.queryIntervalStartDate.toUTCString();
    }

    getQueryIntervalEndISO() {
        return this.wsltQueryParamForm.value.queryIntervalEndDate.toUTCString();
    }
}

export function checkIfEndDateAfterStartDate( c: AbstractControl ) {
    const start = c.get( 'queryIntervalStartDate' );
    const end   = c.get( 'queryIntervalEndDate' );

    if ( !start || !start.value || !end || !end.value ) {
        return null;
    }

    const isValidInterval = end.value.getTime() > start.value.getTime();
    if ( ! isValidInterval ) {
        const msg = 'Invalid query interval: end datetime must be later than start datetime';
        const error = { invalidInterval: msg };

        start.setErrors( error );
        end.setErrors( error );

        console.log( '>>> check(): ' + msg );
        return error;
    }


    start.setErrors( null );
    end.setErrors( null );
    return null;
}
