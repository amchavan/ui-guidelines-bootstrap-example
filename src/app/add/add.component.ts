import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalProgressBarComponent } from "../modal-progress-bar/modal-progress-bar.component";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    importCanceledAlertMessage: string;

    showAlert = false;

    constructor( private modalService: NgbModal ) {
    }

    ngOnInit() {
    }

    public openImportModal() {
        this.showAlert = false;
        this.modalService.open(ModalProgressBarComponent).result.then(
            () => {
                // operation completed, no-op
            },
            (progress) => {
                // show how we can use the information returned by
                // the modal dialog when the user canceled an operation
                console.log(">>> rejected: progress: " + progress );
                this.importCanceledAlertMessage = "Import canceled at " + progress + "%";
                this.showAlert = true;
            });
    }

    public msg(text) {
        console.log(">>> clicked on " + text)
    }

    public closeAlert() {
        this.showAlert = false;
    }
}
