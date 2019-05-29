import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute){
	}

	ngOnInit():void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
