import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {universityModel} from '../../../model/universityModel'


@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.scss']
})
export class AddUniversityComponent implements OnInit {
// public univeritymodel = new universityModel();
// public id:String;
  // constructor(private authService:AuthService, private router:Router) {
  // }

  ngOnInit() {
	// this.univeritymodel.UniversityName="Loding";
	  // debugger;
	  // if(this.id!=undefined)
	  // {
		  // this.univeritymodel = new universityModel();
		  // this.univeritymodel.UniversityName="iii";
	 // this.authService.getUniversityById(this.id).subscribe(university => {     
	// // this.univeritymodel=university;
    // },
    // //observable also returns error
    // err => {
      // console.log(err);
      // return false;
    // });
	  // }
  }
// updateProfile(btn)
// {
	// this.univeritymodel.Pwd=this.generatePassword();
	// this.authService.addUniversity(this.univeritymodel).subscribe(data => {
		// debugger;
		// if(data.success)
		// {
			// debugger;
	     // document.getElementById('close').click();
		// //this.router.navigateByUrl('http://localhost:4200/university');	
		// //this.router.navigate(['/university' ]);
		// }
	// });
	// console.log(this.univeritymodel);
// }

 // generatePassword() {
    // var length = 6,
        // charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        // retVal = "";
    // for (var i = 0, n = charset.length; i < length; ++i) {
        // retVal += charset.charAt(Math.floor(Math.random() * n));
    // }
    // return retVal;
// }

// openmodal(id)
// {
// this.id=id;
// let greeter = new AddUniversityComponent(this.authService,this.router);

// //this.ngOnInit();
	// this.univeritymodel.Address="Anay";
	// debugger;
	
	// alert(this.univeritymodel.Address);
	
// }
}
