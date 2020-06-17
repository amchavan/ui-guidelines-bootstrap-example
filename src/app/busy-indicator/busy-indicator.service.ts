import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BusyIndicatorService {
    private subject = new Subject<boolean>();

    show( option: boolean ) {
        this.subject.next( option );
    }

    subscription(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
