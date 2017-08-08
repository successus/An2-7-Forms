import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from './../models/user'; 

@Component({
  selector: 'app-reactive-signup-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css']
})
export class SignupReactiveFormComponent implements OnInit {

  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  user: User = new User();
  private userForm;
  private signupForm: FormGroup; 

  constructor() {
    
  }

  private setFormValues() {
    this.userForm.setValue({
      firstName: 'Stanislav',
      lastName: 'Revko',
      email: 'test@ukr.net',
      sendProducts: false
    });
}

private patchFormValues() {
    this.userForm.patchValue({
      firstName: 'Stanislav',
      lastName: 'Revko'
    });
}

ngOnInit() {
    this.createForm();
    this.setFormValues();
    // this.patchFormValues();
}


save() {
    // Form model
    console.log(this.userForm);
    //console.log(this.signupForm.form);
    // Form value
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    //console.log(`Saved: ${JSON.stringify(signupForm.value)}`);
  }


  private createForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendProducts: new FormControl(true)
    });
  }



}


