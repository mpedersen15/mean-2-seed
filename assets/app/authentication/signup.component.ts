import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { User } from './user.model';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
	myForm: FormGroup;
	
	constructor(private authService:AuthService){}
	
	ngOnInit(){
		this.myForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', [
				Validators.required, 
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl('', Validators.required),
		})
	}
	
	submitSignupForm(){
		console.log('signup form submit',this.myForm);
		const form = this.myForm.value;
		var user = new User(form.email, form.password, form.firstName, form.lastName);
		this.authService.signup(user)
			.subscribe( (data) => {
				console.log('signup data', data);
			}, error => console.log('error in signup', error));
		this.myForm.reset();
	}
}