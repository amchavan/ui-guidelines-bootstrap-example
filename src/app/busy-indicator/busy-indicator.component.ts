import {Component, OnInit} from '@angular/core';
import { BusyIndicatorService } from './busy-indicator.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrls: ['./busy-indicator.component.css']
})
export class BusyIndicatorComponent implements OnInit {
    public showing: boolean;

    constructor( protected biService: BusyIndicatorService ) {
        this.showing = false;
    }

    ngOnInit(): void {
        this.biService.subscription().subscribe( option => {
            this.showing = option;
        });
    }
}
