import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalWindowComponent } from "../modal-window/modal-window.component";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    closeResult: string;

    constructor(private modalService: NgbModal) {
    }

    ngOnInit() {
        // no-op
    }

    public openImportModal() {
        this.modalService.open(ModalWindowComponent).result.then(
            () => {
                // operation completed, no-op
            },
            (rejected) => {
                // show how we can interact with something returned by
                // modal dialog when the user canceled an operation
                console.log(">>> rejected: " + rejected );
            });
    }

    public msg(text) {
        console.log(">>> clicked on " + text)
    }
}
