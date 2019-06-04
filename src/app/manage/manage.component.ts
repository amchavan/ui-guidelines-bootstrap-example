import { Component, OnInit } from '@angular/core';
import { DataReducerSearchFormComponent } from "../data-reducer-search-form/data-reducer-search-form.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor( private modalService: NgbModal ) { }

  ngOnInit() {
  }

  openDataReducerSearchModal() {
    this.modalService.open( DataReducerSearchFormComponent, { size: 'lg' } ).result.then(
        () => {
          // operation completed, no-op
        },
        (progress) => {
          // show how we can use the information returned by
          // the modal dialog when the user canceled an operation
          console.log(">>> rejected: progress: " + progress );
          // this.importCanceledAlertMessage = "Import canceled at " + progress + "%";
          // this.showAlert = true;
        });

  }
}
