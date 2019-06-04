import { Component, OnInit } from '@angular/core';
import { DataReducerSearchFormComponent } from "../data-reducer-search-form/data-reducer-search-form.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataReducer, allDataReducers } from "../data-reducer";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  dataReducers : DataReducer[];

  constructor( private modalService: NgbModal ) {
  }

  ngOnInit() {
  }

  openDataReducerSearchModal() {
    this.modalService.open( DataReducerSearchFormComponent, { size: 'lg' } ).result.then(
        () => {
          this.dataReducers = allDataReducers;
        },
        () => {
          this.dataReducers = [];
        });
  }
}
