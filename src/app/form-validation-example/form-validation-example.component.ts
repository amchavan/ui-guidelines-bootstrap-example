import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-form-validation-example',
    templateUrl: './form-validation-example.component.html',
    styleUrls: ['./form-validation-example.component.css']
})

export class FormValidationExampleComponent implements OnInit {
    regForm: FormGroup;
    submitted = false;
    isDirty = false;
    defaultEmail = 'user@example.com';
    defaultPassword = '123456';
    dafaultFormValue: any;

    constructor(fb: FormBuilder, public activeModal: NgbActiveModal) {
        this.regForm = fb.group({
            email:    [ this.defaultEmail,    [Validators.required, Validators.email]],
            password: [ this.defaultPassword, [Validators.required, Validators.minLength(6)]],
        });

        this.regForm.valueChanges.subscribe(val => {
            this.isDirty = true;
        });

        this.dafaultFormValue = this.regForm.value;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.regForm.controls;
    }

    ngOnInit() {
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.regForm.invalid) {
            return;
        }

        // Now "submit" the form
        this.isDirty = false;
        const msg = JSON.stringify(this.regForm.value, null, 4);
        console.log(msg);
        alert(msg);
    }

    onReset(): void {
        this.isDirty = false;
        this.submitted = false;
        this.regForm.reset( {
            email:     this.defaultEmail,
            password:  this.defaultPassword
        });
    }
}
