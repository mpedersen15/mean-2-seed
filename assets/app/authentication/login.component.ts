import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent{
	myForm: FormGroup;
	
	ngOnInit(){
		this.myForm = new FormGroup({
			email: new FormControl('', [
				Validators.required, 
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl('', Validators.required),
		})
	}
	
	submitLoginForm(){
		console.log('login form submit',this.myForm);
		this.myForm.reset();
	}
}