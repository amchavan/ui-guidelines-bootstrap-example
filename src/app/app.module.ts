import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageHeaderComponent } from './page-header/page-header.component';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';
import { ModalProgressBarComponent } from './modal-progress-bar/modal-progress-bar.component';
import { ModalAlertWindowComponent } from './modal-alert-window/modal-alert-window.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    AddComponent,
    ManageComponent,
    ModalProgressBarComponent,
    ModalAlertWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalProgressBarComponent]
})
export class AppModule { }
