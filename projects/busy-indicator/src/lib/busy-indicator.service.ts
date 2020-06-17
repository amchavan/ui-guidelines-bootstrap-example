import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BusyIndicatorService {
    private subject = new Subject<boolean>();

    public show( option: boolean = true ) {
        this.subject.next( option );
    }

    public hide( option: boolean = true ) {
        this.show( false );
    }

    subscription(): Observable<any> {
        return this.subject.asObservable();
    }
}
