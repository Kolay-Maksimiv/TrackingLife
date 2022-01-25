import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

import { RegistrationModel } from 'app/models/auth/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submitRegistration(form: NgForm){
      if(form.valid){
        let registrationModel = new RegistrationModel(form.value);
         this.authService.registration(registrationModel).subscribe(respData => {
         },
         error=> {
             console.log(error.error);
             this.error = "Some error occured";
         }
         );
      }
  }
}
