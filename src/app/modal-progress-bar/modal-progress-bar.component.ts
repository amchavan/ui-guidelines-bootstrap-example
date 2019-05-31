
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-progress-bar',
    templateUrl: './modal-progress-bar.component.html',
    styleUrls: ['./modal-progress-bar.component.css']
})
export class ModalProgressBarComponent {

    complete = false;
    progress : number;

    start    = 0;       // initial value of the progress bar
    end      = 100;     // last value of the progress bar
    steps    = 50;      // how many animation steps
    duration = 3;       // how long should the animation last

    sleepTime = (this.duration / this.steps) * 1000;    // sleep time between animation steps, in msec
    increment = (this.end - this.start) / this.steps;

    constructor(public activeModal: NgbActiveModal) {
        // We animate the progress bar to make this demo a bit more interesting
        this.animate();
    }

    private async animate() {
        this.progress = this.start;
        for( var i = 0; i < this.steps; i++ ) {
            this.progress += this.increment;
            await this.sleep( this.sleepTime );
        }
        this.complete = true;
    }

    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
