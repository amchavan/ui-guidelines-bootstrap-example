import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }


  public open() {
    console.log( ">>> open() called" )
    // const config = new TemplateModalConfig<IContext, string, string>(this.modalDialog);
    //
    // config.closeResult = "closed!";
    // config.context = { data: "" };
    //
    // this.modalService
    //     .open(config)
    //     .onApprove(result => {})
    //     .onDeny(result => {});
  }
}
