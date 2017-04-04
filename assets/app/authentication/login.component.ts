import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthService } from './auth.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent{
	myForm: FormGroup;
	
	constructor(private authService: AuthService, private router: Router){}
	
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
		var form = this.myForm.value;
		var user = new User(form.email, form.password);
		this.authService.login(user)
			.subscribe(
				data => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					this.router.navigateByUrl('/');
				},
				error => console.log('login error', error)
			);
		this.myForm.reset();
	}
}