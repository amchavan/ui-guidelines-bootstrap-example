import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PageHeaderComponent } from './page-header/page-header.component';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';
import { ModalProgressBarComponent } from './modal-progress-bar/modal-progress-bar.component';
import { DataReducerSearchFormComponent } from './data-reducer-search-form/data-reducer-search-form.component';
import { BookingComponent } from './booking/booking.component';
import { WsltSearchFormComponent } from './wslt-search-form/wslt-search-form.component';
import { FormValidationExampleComponent } from './form-validation-example/form-validation-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusyIndicatorModule } from 'busy-indicator';
import { BusyIndicatorComponent } from 'busy-indicator';
import { BusyIndicatorService } from 'busy-indicator';

@NgModule({
    declarations: [
        AppComponent,
        PageHeaderComponent,
        AddComponent,
        ManageComponent,
        ModalProgressBarComponent,
        DataReducerSearchFormComponent,
        BookingComponent,
        WsltSearchFormComponent,
        FormValidationExampleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BusyIndicatorModule
    ],
    providers: [
        NgbActiveModal,
        BusyIndicatorService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ModalProgressBarComponent,
        DataReducerSearchFormComponent,
        WsltSearchFormComponent,
        FormValidationExampleComponent,
        BusyIndicatorComponent
    ]
})
export class AppModule { }
