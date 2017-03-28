import { Component } from '@angular/core';

@Component({
	selector: 'app-logout',
	template: `
		<div class="col-md-8 col-md-offset-2">
			<button class="btn btn-danger" (click)="logout()">Logout</button>
		</div>
	`
})
export class LogoutComponent{

	logout(){
		console.log("logging out user...");
	}
}