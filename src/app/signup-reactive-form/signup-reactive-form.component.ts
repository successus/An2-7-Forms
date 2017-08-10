import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from './../models/user';
import { CustomValidators } from './../validators/';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-reactive-signup-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css']
})
export class SignupReactiveFormComponent implements OnInit, OnDestroy {



  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  user: User = new User();
  private userForm;
  private signupForm: FormGroup;
  emailMessage: string;

  private sub: Subscription[] = [];

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) {

  }

  private setMessage(c: AbstractControl) {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object
        .keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
    }
  }


  private watchValueChanges() {
    const sub = this.userForm.get('notification').valueChanges
      .subscribe(value => this.setNotification(value));
    this.sub.push(sub);

    const emailControl = this.userForm.get('emailGroup.email');
    const sub2 = emailControl.valueChanges
      .subscribe(value => this.setMessage(emailControl));
    this.sub.push(sub2);

  }


  private buildForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [
        { value: 'Revko', disabled: false },
        [Validators.required, Validators.maxLength(50)]
      ],

      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      phone: '',
      notification: 'email',
      //serviceLevel: ['', CustomValidators.serviceLevelRange(1,3)],
      serviceLevel: [''],
      sendProducts: true,
      addressType: 'home',
      addresses: this.fb.array([this.buildAddress()])

    });
  }

  private buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      country: '',
      city: '',
      zip: '',
      street1: '',
      street2: ''
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }


  get addresses():FormArray {
    return <FormArray>this.userForm.get('addresses');
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
    //this.createForm();
    this.buildForm();
    // this.setFormValues();
    // this.patchFormValues();
    this.watchValueChanges();
  }

  ngOnDestroy() {
    this.sub.forEach(sub => sub.unsubscribe());
  }



  save() {
    // Form model
    console.log(this.userForm);
    //console.log(this.signupForm.form);
    // Form value
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    //console.log(`Saved: ${JSON.stringify(signupForm.value)}`);
  }

  private setNotification(notifyVia: string) {
    const phoneControl = this.userForm.get('phone');
    const emailControl = this.userForm.get('email');

    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
    }
    else {
      emailControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
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


