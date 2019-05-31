import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalWindowComponent} from "../modal-window/modal-window.component";

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
        console.log(">>> openImportModal() called")
        this.modalService.open(ModalWindowComponent).result.then(
            (fulfilled) => {
                console.log(">>> fulfilled: " + fulfilled );
            },
            (rejected) => {
                console.log(">>> rejected: " + rejected );
            });

        console.log(">>> ModalWindowComponent: " + ModalWindowComponent)
    }

    public msg(text) {
        console.log(">>> clicked on " + text)
    }
}
