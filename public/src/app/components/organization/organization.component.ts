import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  id: String;
  constructor(private elm: ElementRef) {
 this.id = this.elm.nativeElement.getAttribute('id'); 	  }

  ngOnInit() {
	  debugger;
	  this.id = this.elm.nativeElement.getAttribute('id'); 
	  console.log(this.id);
  }

}
