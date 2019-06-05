import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { PageHeaderComponent } from './page-header/page-header.component';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';
import { ModalProgressBarComponent } from './modal-progress-bar/modal-progress-bar.component';
import { DataReducerSearchFormComponent } from './data-reducer-search-form/data-reducer-search-form.component';
import { BookingComponent } from './booking/booking.component';
import { WsltSearchFormComponent } from './wslt-search-form/wslt-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    AddComponent,
    ManageComponent,
    ModalProgressBarComponent,
    DataReducerSearchFormComponent,
    BookingComponent,
    WsltSearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalProgressBarComponent,
    DataReducerSearchFormComponent
  ]
})
export class AppModule { }
